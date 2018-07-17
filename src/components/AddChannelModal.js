import React from 'react';
import { Form, Input, Modal, Button } from 'semantic-ui-react';
import { withFormik } from 'formik';
import { graphql, compose } from 'react-apollo';
import findIndex from 'lodash/findIndex';

import { createChannelMutation, getUserQuery } from '../graphql/queries';

const AddChannelModal = ({
  open,
  onClose,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Add Channel</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Input
            values={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            name="name"
            fluid
            placeholder="Channel name..."
          />
        </Form.Field>
        <Form.Group>
          <Button
            type="submit"
            disabled={isSubmitting}
            onClick={handleSubmit}
            fluid
          >
            Create Channel
          </Button>
          <Button disabled={isSubmitting} fluid onClick={onClose}>
            Cancel
          </Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

export default compose(
  graphql(createChannelMutation),
  withFormik({
    mapPropsToValues: () => ({ name: '' }),
    // Submission handler
    handleSubmit: async (
      values,
      { props: { onClose, teamId, mutate }, setSubmitting }
    ) => {
      await mutate({
        variables: { teamId, name: values.name },
        // updates the UI before the mutation is executed
        optimisticResponse: {
          createChannel: {
            __typename: 'Mutation',
            ok: true,
            channel: {
              __typename: 'Channel',
              id: -1,
              name: values.name
            }
          }
        },
        update: (store, { data: { createChannel } }) => {
          const { ok, channel } = createChannel;
          if (!ok) {
            return;
          }
          // Read the data from our cache for this query.
          const data = store.readQuery({ query: getUserQuery });
          // find the index of the current team id
          const teamIdx = findIndex(data.getUser.teams, ['id', teamId]);
          // add the channel to the team's channels array
          data.getUser.teams[teamIdx].channels.push(channel);
          // Write our data back to the cache.
          store.writeQuery({ query: getUserQuery, data });
        }
      });
      onClose();
      setSubmitting(false);
    }
  })
)(AddChannelModal);
