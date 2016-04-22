/* eslint "react/jsx-key":"off" */

import React, { PropTypes } from 'react';
import { Button, Input } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MCCodeSelect from './MCCodeSelect';

export class NewParamForm extends React.Component {
	static defaultProps = {
		param : {
			type:'P',
			mcc:'7211',
			card:'4234567812345678',
			currency:'810',
			amount:'1000'		
		},
		mccodes : [],
		currencies: [],
		addNewParameter: (p) => {}
	}
	static propTypes = {
		addNewParameter: PropTypes.func.isRequired,
		mccodes: PropTypes.array.isRequired,
		param : PropTypes.object.isRequired,
		currencies: PropTypes.array.isRequired
	}	
	state = {
		...this.props.param,
		id : 1
	}

	types = [{type:'P',desc:"Прямой"},{type:'R',desc:"Обратный"}]
	//currencies = [{code:'810',desc:"Рубль"},{code:'840',desc:"USD"}]

	fieldChanged = (e) => {
		let newState = {...this.state};
		newState[e.target.name]=e.target.value;
		this.setState(newState);
	}

	addParameter= (e) => {
		this.props.addNewParameter(this.state);
		let newState = {...this.state};
		newState.id=this.state.id+1;
		this.setState(newState);	
	}

	mccCodeSelected = (mcc) => {
		let newState = {...this.state};
		newState.mcc=mcc.id;
		this.setState(newState);
	}

	render() {
		console.log("NewParamForm render");
		//const mccCodesData = this.props.mccodes.map((c)=><option value={c.mcc}>{c.mcc+' '+c.description_ru}</option>);
		//
		return(
		<form>
			<Input type="select" addonBefore="Тип" name="type" value={this.state.type} onChange={this.fieldChanged}>
				{this.types.map((e,i) => <option value={e.type}>{e.desc}</option>)}
			</Input>
			<MCCodeSelect mccodes={this.props.mccodes} onSelectionChange={this.mccCodeSelected}/>
			<Input type="text" name="card" addonBefore="Карта" value={this.state.card} onChange={this.fieldChanged}/>
			<Input type="select" name="currency" addonBefore="Валюта" value={this.state.currency} onChange={this.fieldChanged}>
				{this.props.currencies.map((cur)=> <option value={cur.code}>{cur.name}</option>)}
			</Input>
			<Input type="text" name="amount" addonBefore="Количество" value={this.state.amount} onChange={this.fieldChanged}/>
			<Button bsStyle="success" onClick={this.addParameter}>Добавить</Button>
		</form>
		);
	}
}



function mapStateToProps(state) {
  console.log(state);
  return {
    mccodes: state.mccodes,
    currencies: state.currencies
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewParamForm);


//export default NewParamForm;