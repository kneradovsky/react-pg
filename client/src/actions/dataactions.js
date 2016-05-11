import * as types from '../constants/actionTypes';
import urls from '../constants/backend';
import request from 'axios';

export const entities = {
	card : {},
	tariff : {},
	cardrules: {
		validate: {
			type: types.VALIDATE_CARDRULE,
			url: urls.cardrules_validate
		}
	}
};

function getActionTypeByOper(entity,operation) {
	const label = entity.toString().toUpperCase();
	switch(operation) {
		case 'index': return 'LOAD_'+label+'S';
		case 'get' : return 'GET_'+label;
		case 'post': return 'SAVE_'+label;
		case 'delete': return 'DELETE_'+label;
	}
}

export function entityOperation(entity,operation,data,chainlink) {
	let atype,url;
	if(entities[entity] === undefined) throw new Error(`Entity ${entity} is undefined`);
	if(entities[entity][operation] == undefined) {// use defaults
		atype = getActionTypeByOper(entity,operation);
		url = urls[entity+'s'];
	} else {
		atype = entities[entity][operation].type;
		url = entities[entity][operation].url;
	}
	switch(operation) {
		case 'index': return {type: atype, promise: request.get(url), link: chainlink};
		case 'get' : return {type: atype, promise: request.get(`${url}/${data}`),link: chainlink};
		case 'post': return {type: atype, promise: request.post(url,data), link: chainlink};
		case 'delete': return {type: atype, promise: request.delete(`${url}/${data}`),link: chainlink};
	}

}

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

export function deleteParameters(rowkeys) {
	return {type: types.DELETE_PARAMETERS, data:rowkeys};
}


export function selectParameterSet(paramsets,name) {
	return {type: types.SELECT_PARAMETER_SET, payload: {paramsets, name}};
}


export function saveParameterSet(data) {
	return {type: types.SAVE_PARAMETER_SETS, promise: request.post(urls.parameters,data)};
}


export function deleteParameterSet(name) {
	return {type: types.DELETE_PARAMETER_SETS, promise: request.delete(`${urls.parameters}/${name}`)};
}


