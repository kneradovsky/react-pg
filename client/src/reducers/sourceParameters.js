import * as acttypes from '../constants/actionTypes';
import TransParamsHelper from '../lib/TransParam';

const initialState = [];

export default function sourceParameters(state = initialState, action) {
	let newState;
	switch(action.type) {
		case acttypes.ADD_NEW_PARAMETER : 
			if(TransParamsHelper.necessaryDataIsProvidedToAddParam(action.data)) 
				newState = state.concat(action.data);
				console.log(newState);
				return newState;
		case acttypes.GET_PARAMETER_SET: 
			console.log(action);
			return action.res.data;
		default: return state;
	}  
}