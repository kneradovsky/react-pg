import * as types from '../constants/actionTypes';
import urls from '../constants/backend';
import request from 'axios';

export function generateTransactions(settings) {
	return { type: types.GENERATE_TRANSACTIONS, settings };
}

export function addNewParameter(values) {
	return { type: types.ADD_NEW_PARAMETER, data: values}; 
}

export function updateParameter(name,value) {
	return { type: types.UPDATE_PARAMETER, name: name, value:value}; 
}


export function getMCCCodes() {
	return {type: types.GET_MCC_CODES, promise:request.get(urls.dictionaries.mcccodes)};
}

export function getCurrencies() {
	return {type: types.GET_CURRENCIES_CODES, promise:request.get(urls.dictionaries.currencies)};	
}

export function getParameterSetNames() {
	return {type: types.GET_PARAMETER_SETS_NAMES, promise:request.get(urls.parameters)};
}

export function getParameterSet(name) {
	return {type: types.GET_PARAMETER_SET, promise:request.get(urls.parameters+'/'+name)};
}

export function selectParameterSet(paramsets,name) {
	return {type: types.SELECT_PARAMETER_SET, payload: {paramsets, name}};
}


export function saveParameterSet(data) {
	return {type: types.SAVE_PARAMETER_SETS, promise: request.post(urls.parameters,data)}
}
