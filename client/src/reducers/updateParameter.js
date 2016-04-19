import * as acttypes from '../constants/actionTypes';

const initial = {
	type:'P',
	mcc:'7211',
	card:'4234567812345678',
	currency:'810',
	amount:'1000'
}

export default function updateParameter(state = initial, action) {
	let newState;
	switch(action.type) {
		case acttypes.UPDATE_PARAMETER: 
				newState=Object.assign({},state);
				newState[action.name]=action.value;
				console.log(newState);
				return newState;
		default: return state;
	}  
}

