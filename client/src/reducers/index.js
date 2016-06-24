import { combineReducers } from 'redux';
import { dictionary_reducers } from 'redux-redents';
import dictionaries from './dictionaries';
import sourceParameters from './sourceParameters';
import requeststate from './requeststate';
import {entities} from '../actions/dataactions';

const dictsDef = dictionary_reducers(entities);
const dicts = dictionaries();
const rootReducer = combineReducers({
	sourceParameters: sourceParameters,
	requestState :  requeststate,
	...dicts 
});

export default rootReducer;
