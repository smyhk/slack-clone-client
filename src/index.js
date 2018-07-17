import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import 'semantic-ui-css/semantic.min.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import client from './apollo';

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
registerServiceWorker();
