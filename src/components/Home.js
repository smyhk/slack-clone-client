import React, { Component } from 'react';
//import gql from 'graphql-tag';
import { graphql, gql } from 'react-apollo';

const allUsersQuery = gql`
  {
    allUsers {
      id
      username
    }
  }
`;

class Home extends Component {
  render() {
    const {
      data: { loading, allUsers }
    } = this.props;
    if (loading) {
      return null;
    }
    return <div>{allUsers.map(u => <h1 key={u.id}>{u.username}</h1>)}</div>;
  }
}

export default graphql(allUsersQuery)(Home);
