import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import 'semantic-ui-css/semantic.min.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>, 
  document.getElementById('root')
);
registerServiceWorker();
