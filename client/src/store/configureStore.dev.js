//This file merely configures the store for hot reloading.
//This boilerplate file is likely to be the same for each project that uses Redux.
//With Redux, the actual stores are in /reducers.

import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import promiseMiddleware from '../lib/promiseMiddleware';
import chainMiddleware from '../lib/chainMiddleware';

export default function configureStore(initialState) {
  //let store = createStore(rootReducer,initialState,applyMiddleware(chainMiddleware,promiseMiddleware))

  let store = applyMiddleware(promiseMiddleware,chainMiddleware)(createStore)(rootReducer, initialState,compose(
    // Add other middleware on this line...
    window.devToolsExtension ? window.devToolsExtension() : f => f //add support for Redux dev tools
    )
  );



  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
