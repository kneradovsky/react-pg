import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import GenTransactionsPage from './containers/GenTransactionsPage';
import NotFoundPage from './components/NotFoundPage.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={GenTransactionsPage} />
    <Route path="/genTransactions" component={GenTransactionsPage}/>
    <Route path="*" component={NotFoundPage} />
  </Route>
);
