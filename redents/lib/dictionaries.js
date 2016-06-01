import * as acttypes from '../constants/actionTypes';
import {entities  as dataEntities} from '../actions/dataactions';

function reduceDict(acttype,initial) {
	const initialState = initial || [];
	return (state = initialState, action) => {
		if(action.type!=acttype) return state;
		return action.res.data;
	};
}

function reduceCardsByExpression(state=[], action) {
	if(action.type!=acttypes.CARD_VALIDATE_EXPRESSION) return state;
	const retval = action.res.data.map((card,i) => Object.assign(card,{tariffname:card.tariff.name}));
	return retval;
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
		cardsByExpression: reduceCardsByExpression,
		countries: reduceDict(acttypes.LOAD_COUNTRIES),
		transactionset : reduceDict(acttypes.GET_TRANSACTIONSET),
		...entOpers
	};
}