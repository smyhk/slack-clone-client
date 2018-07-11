import React, { Component } from 'react';

import Channels from './Channels';
import Teams from './Teams';
import Header from './Header';
import Messages from './Messages';
import Input from './Input';
import AppLayout from './AppLayout';

class ViewTeam extends Component {
  render() {
    return (
      <AppLayout>
        <Teams>Teams</Teams>
        <Channels>Channels</Channels>
        <Header>Header</Header>
        <Messages>
          <ul className="message-list">
            <li />
            <li />
          </ul>
        </Messages>
        <Input>
          <input type="text" placeholder="Css Grid Layout Module" />
        </Input>
      </AppLayout>
    );
  }
}

export default ViewTeam;
