import * as acttypes from '../constants/actionTypes';
import * as actions from '../actions/dataactions'

export default function dataEntitiesOps(state = [], action) {
	let newState;
	switch(action.type) {
		case acttypes.SAVE_CARD : // reload index after card save
			console.log("dataEntitiesOps");
			store.dispatch(actions.entityOperation('card','index'));
			return state;
		default: return state;
	}  
}