import * as acttypes from '../constants/actionTypes';
import TransParamsHelper from '../lib/TransParam';

const initialState = [];

export default function sourceParameters(state = initialState, action) {
	let newState;
	switch(action.type) {
		case acttypes.ADD_NEW_PARAMETER : 
			if(TransParamsHelper.necessaryDataIsProvidedToAddParam(action.data)) 
				return state.concat(action.data);
			else return state;
		case acttypes.GET_PARAMETER_SET: 
			return action.res.data;
		case acttypes.DELETE_PARAMETERS:
			newState = state.filter((p)=>action.data.indexOf(p.id)==-1);
			return newState;
		default: return state;
	}  
}