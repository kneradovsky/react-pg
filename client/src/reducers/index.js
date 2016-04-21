import { combineReducers } from 'redux';
import sourceParameters from './sourceParameters';
import dictionaries from './dictionaries';

const dicts = dictionaries();
	
const rootReducer = combineReducers({
	sourceParameters: sourceParameters,
	...dicts
});

export default rootReducer;
