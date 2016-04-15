import * as acttypes from '../constants/actionTypes';
import TransParamsHelper from '../businessLogic/TransParam';

const initialState = [];

export default function sourceParameters(state = initialState, action) {
	let newState;
	console.log(action);
	switch(action.type) {
		case acttypes.ADD_NEW_PARAMETER : 
			if(TransParamsHelper.necessaryDataIsProvidedToAddParam(action.data)) 
				newState = state.concat(action.data);
				console.log(newState);
				return newState;
		default: return state;
	}  
}