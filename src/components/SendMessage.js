import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import { withFormik } from 'formik';
import { graphql, compose } from 'react-apollo';

import { createMessageMutation } from '../graphql/queries';

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
`;

const SendMessage = ({
  channelName,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => (
  <SendMessageWrapper>
    <Input
      name="message"
      value={values.message}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={e => {
        // enter key
        if (e.keyCode === 13 && !isSubmitting) {
          handleSubmit(e);
        }
      }}
      fluid
      placeholder={`Message # ${channelName}`}
    />
  </SendMessageWrapper>
);

export default compose(
  graphql(createMessageMutation),
  withFormik({
    mapPropsToValues: () => ({ message: '' }),
    // Submission handler
    handleSubmit: async (
      values,
      { props: { channelId, mutate }, setSubmitting, resetForm }
    ) => {
      if (!values.message || !values.message.trim()) {
        setSubmitting(false);
        return;
      }
      await mutate({
        variables: { channelId, text: values.message }
      });
      resetForm(false);
    }
  })
)(SendMessage);
