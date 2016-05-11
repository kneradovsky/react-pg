import * as types from '../constants/actionTypes';
import urls from '../constants/backend';
import request from 'axios';

export const entities = {
	card : {},
	tariff : {},
	parameter: {
		names : {
			type : types.GET_PARAMETER_SETS_NAMES,
			request: (data) => request.get(urls.parameters)
		}
	},
	cardrules: {
		validate: {
			type: types.VALIDATE_CARDRULE,
			request: (data) => request.post(urls.cardrules_validate,data)
		}
	},
	currencies: {
		index: {
			type: types.GET_CURRENCIES_CODES,
			url: urls.currencies
		}
	},
	mccodes: {
		index: {
			type: types.GET_MCC_CODES,
			url: urls.mcccodes
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
/**
* Main function for data exchange with server. Default operations supported: index,get,post and delete
* To make entity be supported you should add it to the entities object. 
* You could also specify nonstandard operations as children elements of the entity.
* @param {entity} - entity name to operate on
* @param {operation} - operation name to perform
* @param {data} - optional data required for operations. By convention data is used for
*	'get' - will be added to the url  as `url/id`
*	'post' - will be sent as request body
*	'delete' - will be added to the url  as `url/id`
* @param {chainlink} - optional action to perform after the current action will be finished
*
* @return action to be dispatched by redux
**/
export function entityOperation(entity,operation,data,chainlink) {
	let atype,url,arequest;
	if(entities[entity] === undefined) throw new Error(`Entity ${entity} is undefined`);
	if(entities[entity][operation] === undefined) {// use defaults
		atype = getActionTypeByOper(entity,operation);
		url = urls[entity+'s'];
	} else {
		atype = entities[entity][operation].type;
		url = entities[entity][operation].url;
		if(url === undefined) url = urls[entity+'s'];
		if(!(entities[entity][operation].request === undefined))
			arequest = entities[entity][operation].request(data);
	}
	switch(operation) {
		case 'index': return {type: atype, promise: request.get(url), link: chainlink};
		case 'get' : return {type: atype, promise: request.get(`${url}/${data}`),link: chainlink};
		case 'post': return {type: atype, promise: request.post(url,data), link: chainlink};
		case 'delete': return {type: atype, promise: request.delete(`${url}/${data}`),link: chainlink};
		default: if(arequest===undefined) throw new Error(`Request property is undefined for operation ${operation} on ${entity}`)
			return {type: atype, promise: arequest, link: chainlink};
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

export function getParameterSet(name) {
	return {type: types.GET_PARAMETER_SET, promise:request.get(urls.parameters+'/'+name)};
}

export function deleteParameters(rowkeys) {
	return {type: types.DELETE_PARAMETERS, data:rowkeys};
}


export function selectParameterSet(paramsets,name) {
	return {type: types.SELECT_PARAMETER_SET, payload: {paramsets, name}};
}

/*
export function saveParameterSet(data) {
	return {type: types.SAVE_PARAMETER_SET, promise: request.post(urls.parameters,data)};
}


export function deleteParameterSet(name) {
	return {type: types.DELETE_PARAMETER_SET, promise: request.delete(`${urls.parameters}/${name}`)};
}
*/

