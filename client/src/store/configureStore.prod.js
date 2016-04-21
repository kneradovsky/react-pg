import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import promiseMiddleware from '../lib/promiseMiddleware';

export default function configureStore(initialState) {
  return applyMiddlware(promiseMiddleware)(createStore)(rootReducer, initialState);
}
