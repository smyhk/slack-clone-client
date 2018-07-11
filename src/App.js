import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import decode from 'jwt-decode';

import Home from './components/Home';
import Login from './components/Login';
import RegisterUser from './components/RegisterUser';
import CreateTeam from './components/CreateTeam';
import ViewTeam from './components/ViewTeam';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    decode(token);
    decode(refreshToken);
  } catch (error) {
    return false;
  }

  return true;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login'
          }}
        />
      )
    }
  />
);

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={RegisterUser} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/view-team" component={ViewTeam} />
          <PrivateRoute exact path="/create-team" component={CreateTeam} />
        </Switch>
      </Router>
    );
  }
}

export default App;
