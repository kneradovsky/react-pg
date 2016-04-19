import * as acttypes from '../constants/actionTypes';

const initialState = [];

export default function sourceParameters(state = initialState, action) {
	let newState;
	console.log(action);
	switch(action.type) {
		case acttypes.GET_MCC_CODES : 
			return state;
		default: return state;
	}  
}