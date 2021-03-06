import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import GenTransactionsPage from './containers/GenTransactionsPage';
import CardsPage from './containers/CardsPage';
import TransactionSetsPage from './containers/TransactionSetsPage';
import NotFoundPage from './components/NotFoundPage.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={GenTransactionsPage} />
    <Route path="/Home/Cards" component={CardsPage}/>
    <Route path="/Home/Transactions" component={TransactionSetsPage}/>
    <Route path="*" component={NotFoundPage} />
  </Route>
);
