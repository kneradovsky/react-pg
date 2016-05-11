import { combineReducers } from 'redux';
import sourceParameters from './sourceParameters';
import dictionaries from './dictionaries';
import requeststate from './requeststate';

const dicts = dictionaries();
console.log(dicts);
const rootReducer = combineReducers({
	sourceParameters: sourceParameters,
	requestState :  requeststate,
	...dicts
});

export default rootReducer;
