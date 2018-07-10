import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import RegisterUser from './components/RegisterUser';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={RegisterUser} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    );
  }
}

export default App;
