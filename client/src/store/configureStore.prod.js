import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import promiseMiddleware from '../lib/promiseMiddleware';
import chainMiddleware from '../lib/chainMiddleware';


export default function configureStore(initialState) {
  return applyMiddlware(promiseMiddleware,chainMiddleware)(createStore)(rootReducer, initialState);
}
