import * as types from '../constants/actionTypes';

export function generateTransactions(settings) {
	return { type: types.GENERATE_TRANSACTIONS, settings };
}

export function addNewParameter1(type,mcc,card,currency,amount) {
	return { type: types.ADD_NEW_PARAMETER, data: {type:type, mcc:mcc,card:card,currency:currency,amount:amount}}; 
}

export function addNewParameter(values) {
	return { type: types.ADD_NEW_PARAMETER, data: values}; 
}

export function loadMCCCodes(codepart) {
	return { type: types.GET_MCC_CODES, startwith: codepart}; 
}

export function updateParameter(name,value) {
	return { type: types.UPDATE_PARAMETER, name: name, value:value}; 
}
