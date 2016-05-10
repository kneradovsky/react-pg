import { combineReducers } from 'redux';
import sourceParameters from './sourceParameters';
import dictionaries from './dictionaries';
import requeststate from './requeststate';
import dataEntititesOps from './dataEntitiesOperations';

const dicts = dictionaries();
console.log(dicts);
const rootReducer = combineReducers({
	sourceParameters: sourceParameters,
	requestState :  requeststate,
	dataEntitiesOperations : dataEntititesOps,
	...dicts
});

export default rootReducer;
