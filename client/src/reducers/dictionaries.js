import * as acttypes from '../constants/actionTypes';

function reduceDict(acttype) {
	return (state = [], action) => {
		switch(action.type) {
			case acttype: 
				console.log(action);
				return action.res.data;
		}
		return state;
	};
}

function mcccodesFun(state = [], action) {
	switch(action.type) {
		case acttypes.GET_MCC_CODES: return action.res.data;
	}
	return state;
}

export default function dictionaries(state = [], action) {
	return {
		mccodes : reduceDict(acttypes.GET_MCC_CODES),
		currencies: reduceDict(acttypes.GET_CURRENCIES_CODES),
		paramsets: reduceDict(acttypes.GET_PARAMETER_SETS_NAMES)
	}
/*
	switch(action.type) {
		case acttypes.GET_MCC_CODES:
		case acttypes.GET_CURRENCIES_CODES:
		case acttypes.GET_PARAMETER_SETS: 
			console.log(action);
			return action.res.data;
		default: return state;
	}
*/	
}