import React from 'react';
import ReactDOM from 'react-dom';
// import ApolloClient from 'apollo-boost';
import {
  ApolloClient,
  createNetworkInterface,
  ApolloProvider
} from 'react-apollo';
import 'semantic-ui-css/semantic.min.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:8080/graphql'
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }

      req.options.headers['x-token'] = localStorage.getItem('token');
      req.options.headers['x-refresh-token'] = localStorage.getItem(
        'refreshToken'
      );
      next();
    }
  }
]);

networkInterface.useAfter([
  {
    applyAfterware(
      {
        response: { headers }
      },
      next
    ) {
      const token = headers.get('x-token');
      const refreshToken = headers.get('x-refresh-token');

      if (token) {
        localStorage.setItem('token', token);
      }

      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }

      next();
    }
  }
]);

const client = new ApolloClient({
  networkInterface
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
registerServiceWorker();
