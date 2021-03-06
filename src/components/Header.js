import React from 'react';
import styled from 'styled-components';
import { Header } from 'semantic-ui-react';

const HeaderWrapper = styled.div`
  grid-column: 3;
  grid-row: 1;
`;

const Head = ({ channelName }) => (
  <HeaderWrapper>
    <Header textAlign="center">{`#${channelName}`}</Header>
  </HeaderWrapper>
);

export default Head;
