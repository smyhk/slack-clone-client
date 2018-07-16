import gql from 'graphql-tag'; // parses queries

// queries
const allTeamsQuery = gql`
  {
    allTeams {
      id
      owner
      name
      channels {
        id
        name
      }
    }
    inviteTeams {
      id
      owner
      name
      channels {
        id
        name
      }
    }
  }
`;

// mutations
const createChannelMutation = gql`
  mutation($teamId: Int!, $name: String!) {
    createChannel(teamId: $teamId, name: $name) {
      ok
      channel {
        id
        name
      }
    }
  }
`;

const CreateTeamMutation = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      ok
      team {
        id
      }
      errors {
        path
        message
      }
    }
  }
`;

const LoginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

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

const addTeamMemberMutation = gql`
  mutation($email: String!, $teamId: Int!) {
    addTeamMember(email: $email, teamId: $teamId) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export {
  allTeamsQuery,
  addTeamMemberMutation,
  createChannelMutation,
  CreateTeamMutation,
  LoginMutation,
  registerUserMutation
};
