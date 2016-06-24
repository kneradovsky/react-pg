import * as types from '../constants/actionTypes';
import urls from '../constants/backend';
import { createEntityOperation} from 'redux-redents';
import request from 'axios';


export const entities = {
	card : {
		validateExpression: {
			type: types.CARD_VALIDATE_EXPRESSION,
			request: (data) => request.post(urls.cards+"/cardsByExpression",data)
		}
	},
	tariff : {
		index: {
			url: urls.tariffs
		},
		get: {
			url: urls.tariffs
		}
	},
	country: {
		index: {
			type : types.LOAD_COUNTRIES,
			url: urls.countries
		}
	},
	parameter: {
		names : {
			type : types.GET_PARAMETER_SETS_NAMES,
			request: (data) => request.get(urls.parameters)
		}
	},
	cardrule: {
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
	},
	transactionset: {}

};

export const dataEnts = {
	defaults: {
		baseUrl: urls.baseUrl+'data/'
	},
	entities : entities	
};

export const entityOperation = createEntityOperation(dataEnts);

export function emitAction(actiontype,actdata) {
	return {...actdata,type:actiontype};
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



