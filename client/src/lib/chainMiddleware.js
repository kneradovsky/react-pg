/* eslint "no-console":"off" */
import * as actypes from '../constants/actionTypes';
import {entityOperation} from '../actions/dataactions';

const chainMiddleware = store => next => action => {
    //dispatch chain actions

    if(action.status=='done' && !(action.link===undefined)) //link contains function that returns action to perform next
      store.dispatch(action.link())
      /*
      switch(action.type) {
        case actypes.SAVE_CARD : store.dispatch(entityOperation('card','index'));break;
        case actypes.SAVE_TARIFF: store.dispatch(entityOperation('tariff','index'));break;
      }
      */
    //dispatch original action
    return next(action);
  };

export default chainMiddleware;