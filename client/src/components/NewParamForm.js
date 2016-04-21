import React, { PropTypes } from 'react';
import { Button, Input } from 'react-bootstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

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
		...this.props.param
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
	}

	render() {
		console.log(this.props);
		return(
		<form>
			<div>
			<Input type="select" addonBefore="Тип" name="type" value={this.state.type} onChange={this.fieldChanged}>
				{this.types.map((e,i) => <option value={e.type}>{e.desc}</option>)}
			</Input>
			<Input type="text" name="mcc" addonBefore="MCC" value={this.state.mcc} onChange={this.fieldChanged}/>
			<Input type="text" name="card" addonBefore="Карта" value={this.state.card} onChange={this.fieldChanged}/>
			<Input type="select" name="currency" addonBefore="Валюта" value={this.state.currency} onChange={this.fieldChanged}>
				{this.props.currencies.map((cur,i,k)=> <option value={cur.code}>{cur.name}</option>)}
			</Input>
			<Input type="text" name="amount" addonBefore="Количество" value={this.state.amount} onChange={this.fieldChanged}/>
			<Button bsStyle="success" onClick={this.addParameter}>Добавить</Button>
			</div>
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