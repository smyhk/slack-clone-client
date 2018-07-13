import React, { Component } from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import {
  Message,
  Form,
  Button,
  Input,
  Container,
  Header
} from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import { LoginMutation } from '../graphql/queries';

class Login extends Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      email: '',
      password: '',
      errors: {}
    });
  }

  onSubmit = async () => {
    const { email, password } = this;
    const response = await this.props.mutate({
      variables: { email, password }
    });

    const { ok, token, refreshToken, errors } = response.data.login;
    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      this.props.history.push('/');
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });

      this.errors = err;
    }
  };

  onChange = e => {
    const { name, value } = e.target;
    this[name] = value;
  };

  render() {
    const {
      email,
      password,
      errors: { emailError, passwordError }
    } = this;

    const errorList = [];

    if (emailError) {
      errorList.push(emailError);
    }
    if (passwordError) {
      errorList.push(passwordError);
    }

    return (
      <Container text>
        <Header as="h2">Login</Header>
        <Form>
          <Form.Field error={!!emailError}>
            <Input
              name="email"
              onChange={this.onChange}
              value={email}
              placeholder="Email"
              fluid
            />
          </Form.Field>
          <Form.Field error={!!passwordError}>
            <Input
              name="password"
              onChange={this.onChange}
              value={password}
              type="password"
              placeholder="Password"
              fluid
            />
          </Form.Field>
          <Button onClick={this.onSubmit}>Submit</Button>
        </Form>
        {errorList.length ? (
          <Message
            error
            header="There were some errors with your submission"
            list={errorList}
          />
        ) : null}
      </Container>
    );
  }
}

export default graphql(LoginMutation)(observer(Login));
