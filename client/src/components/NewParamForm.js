import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';

const NewParamForm = ({addNewParameter,loadMCCCodes,mccCodes}) => {
	const types = [{type:'P',desc:"Прямой"},{type:'R',desc:"Обратный"}]
	const currencies = [{code:'810',desc:"Рубль"},{type:'840',desc:"USD"}]
	const initial = {
		type: 'P',
		mcc: '7211',
		card: '4500000012345678',
		currency: '810',
		amount: '0'
	};
	const addNewParam = (e) => {
		console.log(e);
	}
	let opt,cur;
	return (
		<form>
			<div className="input-group">
				<span className="input-group-addon">Тип</span>
				<select name="type" id="inType" value={initial.type}>
					for(opt in this.types) {<option value={opt.type}>{opt.desc}</option>};
				</select>
			</div> 
			<div className="input-group">
				<span className="input-group-addon">MCC</span>
				<input type="text" name="mcc" value={initial.mcc}/>
			</div>
			<div className="input-group">
				<span className="input-group-addon">Номер карты</span>
				<input type="text" name="card" value={initial.card}/>
			</div>
			<div className="input-group">
				<span className="input-group-addon">Валюта</span>
				<select name="currency" id="inCur" value={initial.currency}>
					for(cur in currencies) <option value={cur.code}>{cur.desc}</option>;
				</select>
			</div>
			<div className="input-group">
				<span className="input-group-addon">Количество</span>
				<input type="text" name="amount" value={initial.amount}/>
			</div>
			<Button bsStyle="regular" onClick={addNewParam}>Добавить</Button>
		</form>
		);
};

NewParamForm.propTypes = {
	addNewParameter: PropTypes.func.isRequired,
	loadMCCCodes: PropTypes.func.isRequired,
	mccCodes: PropTypes.func.isRequired
};


export default NewParamForm;