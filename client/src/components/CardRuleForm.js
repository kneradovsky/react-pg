import React, { Component, PropTypes } from 'react';
import { Button, Input } from 'react-bootstrap';
import moment  from 'moment';

export class CardRuleForm extends React.Component {
	static propTypes = {
		activeRule: PropTypes.object.isRequired,
		saveRule: PropTypes.func.isRequired,
		deleteRule: PropTypes.func.isRequired,
		validateRule: PropTypes.func.isRequired,
		tariffs: PropTypes.array.isRequired
	}
	state = {
	}
	constructor(props) {
		super(props);
		this.state=this.initialState();
	}

	initialState(stateFrom) {
		let stfrom = stateFrom;
		if(stfrom === undefined) stfrom=this.props.activeRule;
		return stfrom;
	}
	componentWillReceiveProps(nextprops) {
		this.setState(this.initialState(nextprops.activeRule));
	}

	fieldChanged = (e) => {
		let newState = {...this.state};
		newState[e.target.name]=e.target.value;
		this.setState(newState);
	}

	saveRule = (e) => {
		this.props.saveRule(this.state);
	} 
	deleteRule = (e) => {
		this.props.deleteRule(this.state);
	}
	validateRule = (e) => {
		this.props.validateRule(this.state);
	}
	addRule = (e) => {
		let rule = {...this.state};
		rule.id=0;
		this.props.saveRule(rule);
	}
	render() {
		return(
		<div>
			<form>
				<Input type="text" addonBefore="Правило" name="name" value={this.state.name} onChange={this.fieldChanged}/>
				<Input type="select" addonBefore="Тариф" name="tariffid" value={this.state.tariffid} onChange={this.fieldChanged}>
						{this.props.tariffs.map((t,k) => <option value={t.id}>{t.name}</option>)}
				</Input>
				<Input type="text" addonBefore="Выражение" name="expression" value={this.state.expression} onChange={this.fieldChanged}/>
				<div className="input-group form-inline">
					<Button bsStyle="info" onClick={this.addRule}>Добавить</Button>&nbsp;{' '}
					<Button bsStyle="warning" onClick={this.saveRule}>Сохранить</Button>&nbsp;{' '}
					<Button bsStyle="danger" onClick={this.deleteRule}>Удалить</Button>{' '}
				</div>
				<br/>
				<Button bsStyle="success" onClick={this.validateRule}>Проверить правило</Button>{' '}
			</form>
		</div>
		);
	}
}

export default CardRuleForm;