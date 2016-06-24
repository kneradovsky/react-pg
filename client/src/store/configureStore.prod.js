import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import {promiseMiddleware, chainMiddleware} from 'redux-redents';



export default function configureStore(initialState) {
  return applyMiddlware(promiseMiddleware,chainMiddleware)(createStore)(rootReducer, initialState);
}
