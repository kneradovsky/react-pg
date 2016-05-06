
const loaderInitial = {
	inprog : 0,
	errors : []
}

export default function checkRequestState(state = loaderInitial, action) {
	let newState = {...state};
	switch(action.status) {
		case 'request':
			//if no request in progress then clear errors list
			if(newState.inprog==0) newState.errors=[];
			newState.inprog++;
			break;
		case 'done' :
			newState.inprog--;
			break;
		case 'error':
			console.log(action.error)
			newState.inprog--;
			newState.errors = newState.errors.concat(action.error);
			break;
	}
	return newState;
}