import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import RegisterUser from './components/RegisterUser';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={RegisterUser} />
        </Switch>
      </Router>
    );
  }
}

export default App;
