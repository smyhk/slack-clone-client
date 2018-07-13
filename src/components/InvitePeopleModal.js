import React from 'react';
import { Form, Input, Modal, Button } from 'semantic-ui-react';
import { withFormik } from 'formik';
import { graphql, compose } from 'react-apollo';

import { addTeamMemberMutation } from '../graphql/queries';
import normalizeErrors from '../utils/normalizeErrors';

const InvitePeopleModal = ({
  open,
  onClose,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  touched,
  errors
}) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Add People to your Team</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Input
            values={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            name="email"
            fluid
            placeholder="User email"
          />
        </Form.Field>
        {touched.email && errors.email ? errors.email : null}
        <Form.Group widths="equal">
          <Button
            type="submit"
            disabled={isSubmitting}
            onClick={handleSubmit}
            fluid
          >
            Add User
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
  graphql(addTeamMemberMutation),
  withFormik({
    mapPropsToValues: () => ({ email: '' }),
    // Submission handler
    handleSubmit: async (
      values,
      { props: { onClose, teamId, mutate }, setSubmitting, setErrors }
    ) => {
      const response = await mutate({
        variables: { teamId, email: values.email }
      });
      const { ok, errors } = response.data.addTeamMember;
      if (ok) {
        onClose();
        setSubmitting(false);
      } else {
        setSubmitting(false);
        setErrors(normalizeErrors(errors));
      }
    }
  })
)(InvitePeopleModal);
