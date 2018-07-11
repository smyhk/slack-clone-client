import React, { Component } from 'react';

import Channels from './Channels';
import Teams from './Teams';
import Header from './Header';
import Messages from './Messages';
import SendMessage from './SendMessage';
import AppLayout from './AppLayout';

class ViewTeam extends Component {
  render() {
    return (
      <AppLayout>
        <Teams teams={[{ id: 1, letter: 'S' }, { id: 2, letter: 'P' }]} />
        <Channels
          teamName="Team name"
          username="Username"
          channels={[{ id: 1, name: 'general' }, { id: 1, name: 'random' }]}
          users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
        />
        <Header channelName={'general'} />
        <Messages>
          <ul className="message-list">
            <li />
            <li />
          </ul>
        </Messages>
        <SendMessage channelName="general" />
      </AppLayout>
    );
  }
}

export default ViewTeam;
