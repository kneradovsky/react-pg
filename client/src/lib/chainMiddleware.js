/* eslint "no-console":"off" */
import * as actypes from '../constants/actionTypes';
import {entityOperation} from '../actions/dataactions';

const chainMiddleware = store => next => action => {
    //dispatch chain actions
    if(action.status=='done' && !(action.link===undefined)) //link contains function that returns action to perform next
      store.dispatch(action.link());
    //dispatch original action
    return next(action);
  };

export default chainMiddleware;