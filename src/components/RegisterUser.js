import React, { Component } from "react";
import { Message, Button, Input, Container, Header } from "semantic-ui-react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      usernameError: "",
      email: "",
      emailError: "",
      password: "",
      passwordError: ""
    };
  }

  onSubmit = async () => {
    this.setState({
      usernameError: "",
      emailError: "",
      passwordError: ""
    });

    const { username, email, password } = this.state;
    const response = await this.props.mutate({
      variables: { username, email, password }
    });

    const { ok, errors } = response.data.registerUser;
    if (ok) {
      this.props.history.push("/");
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });

      this.setState(err);
    }
    console.info(response);
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      username,
      email,
      password,
      usernameError,
      emailError,
      passwordError
    } = this.state;

    const errorList = [];

    if (usernameError) {
      errorList.push(usernameError);
    }
    if (emailError) {
      errorList.push(emailError);
    }
    if (passwordError) {
      errorList.push(passwordError);
    }

    return (
      <Container text>
        <Header as="h2">Register</Header>
        <Input
          error={!!usernameError}
          name="username"
          onChange={this.onChange}
          value={username}
          placeholder="Username"
          fluid
        />
        <Input
          error={!!emailError}
          name="email"
          onChange={this.onChange}
          value={email}
          placeholder="Email"
          fluid
        />
        <Input
          error={!!passwordError}
          name="password"
          onChange={this.onChange}
          value={password}
          type="password"
          placeholder="Password"
          fluid
        />
        <Button onClick={this.onSubmit}>Submit</Button>
        {usernameError || emailError || passwordError ? (
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

const registerUserMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    registerUser(username: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(registerUserMutation)(RegisterUser);
