import React, { PropTypes } from 'react';
import { Button, Input } from 'react-bootstrap';

const NewParamForm = ({updateParameter,mccCodes,param}) => {
	const types = [{type:'P',desc:"Прямой"},{type:'R',desc:"Обратный"}];
	const currencies = [{code:'810',desc:"Рубль"},{code:'840',desc:"USD"}];
	const fieldChanged = (e) => {
		updateParameter(e.target.name,e.target.value);
	};
	return (
		<form>
			<div>
			<div className="input-group">
				<span className="input-group-addon">Тип</span>
				<select name="type" id="inType" value={param.type} onChange={fieldChanged}>
				{types.map((e,i) => <option value={e.type}>{e.desc}</option>)}
				</select>
			</div> 
			<Input type="text" addonBefore="MCC" value={param.mcc} onChange={fieldChanged}/>
			<div className="input-group">
				<span className="input-group-addon">Номер карты</span>
				<input type="text" name="card" value={param.card} onChange={fieldChanged}/>
			</div>
			<div className="input-group">
				<span className="input-group-addon">Валюта</span>
				<select name="currency" id="inCur" value={param.currency} onChange={fieldChanged}>
				{currencies.map((cur,i,k)=> <option value={cur.code}>{cur.desc}</option>)}
				</select>
			</div>
			<div className="input-group">
				<span className="input-group-addon">Количество</span>
				<input type="text" name="amount" value={param.amount} onChange={fieldChanged}/>
			</div>
			
			</div>
		</form>
		);
};

NewParamForm.propTypes = {
	updateParameter: PropTypes.func.isRequired,
	mccCodes: PropTypes.array.isRequired,
	param : PropTypes.object.isRequired
};


export default NewParamForm;