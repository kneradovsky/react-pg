import { combineReducers } from 'redux';
import sourceParameters from './sourceParameters';
import loadCodes from './loadCodes';

const rootReducer = combineReducers({
	sourceParameters,
	loadCodes
});

export default rootReducer;
