import * as acttypes from '../constants/actionTypes';
import {entities  as dataEntities} from '../actions/dataactions';

function reduceDict(acttype) {
	return (state = [], action) => {
		switch(action.type) {
			case acttype:  
				console.log(acttype);
				return action.res.data;
		}
		return state;
	};
}

export default function dictionaries(state = [], action) {
	//generate entries for data entities
	const entOpers = Object.keys(dataEntities).reduce((prev,cur)=> {
		const res = Object.assign(prev);
		res[cur+'s'] = reduceDict('LOAD_'+cur.toString().toUpperCase()+'S');
		return res;
	},{});
	return {
		mccodes : reduceDict(acttypes.GET_MCC_CODES),
		currencies: reduceDict(acttypes.GET_CURRENCIES_CODES),
		paramsets: reduceDict(acttypes.GET_PARAMETER_SETS_NAMES),
		cardsByExpression: reduceDict(acttypes.CARD_VALIDATE_EXPRESSION),
		...entOpers
	};
}