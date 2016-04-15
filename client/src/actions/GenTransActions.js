import * as types from '../constants/actionTypes';

export function generateTransactions(settings) {
	return { type: types.GENERATE_TRANSACTIONS, settings };
}

export function addNewParameter(type,mcc,card,currency,amount) {
	return { type: types.ADD_NEW_PARAMETER, data: {type:type, mcc:mcc,card:card,currency:currency,amount:amount}}; 
}

