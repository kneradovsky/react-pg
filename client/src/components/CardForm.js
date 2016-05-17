/* eslint "react/jsx-key":"off", "react/no-set-state":"off" */
import React, { Component, PropTypes } from 'react';
import { Button, Input } from 'react-bootstrap';
import moment  from 'moment';

export class CardForm extends React.Component {
	static propTypes = {
		card: PropTypes.object.isRequired,
		saveCard: PropTypes.func.isRequired,
		tariffs: PropTypes.array.isRequired
	}

	constructor(props) {
		super(props);
		this.state=this.initialState();
	}
	componentWillReceiveProps(nextprops) {
		this.setState(this.initialState(nextprops.card));
	}
	initialState(stateFrom=undefined) {
		let stfrom = stateFrom;
		if(stfrom === undefined) stfrom=this.props.card;
		moment.locale("ru");
		const date = moment(stfrom.expdate,"YYYY-MM-DD-HH:mm:ss");
		return {
			...stfrom,
			expmonth: date.format("M"),
			expyear: date.format("YYYY")
		}; 
	}

	fieldChanged = (e) => {
		let newState = {...this.state};
		newState[e.target.name]=e.target.value;
		this.setState(newState);
	}

	generateCard = () => {
		const strExpDate = `${this.state.expyear}-${this.state.expmonth}-01`;
		const expDate = moment(strExpDate,"YYYY-MM-DD");
		const card = {
			...this.state,
			expdate:expDate
		};
		return card;
	}
	saveCard = (e) => {
		this.props.saveCard(this.generateCard());
	} 
	undoCard = (e) => {
		this.setState(this.initialState());
	}
	addCard = (e) => {
		const card = this.generateCard();
		card.id=0;
		this.props.saveCard(card);
	}
	resetCard = (e) => {
		this.setState({number:'',expdate:'',tariffid:'',balance:'',expmonth:'',expyear:''});
	}
	render() {
		return(
		<div>
			<form>
				<Input type="text" addonBefore="Номер" name="number" value={this.state.number} onChange={this.fieldChanged}/>
				<div className="form-inline">
					<Input addonBefore="ExpDate month" type="select" name="expmonth" value={this.state.expmonth} onChange={this.fieldChanged}>
						{Array.from({length: 12},(v,k)=>k+1).map((it,k) => <option value={it}>{moment(it,"MM").format("MMM")}</option>)}
					</Input>{' '}
					<Input type="select" addonAfter="year" name="expyear" value={this.state.expyear} onChange={this.fieldChanged}>
						{Array.from({length: 10},(v,k)=>k+2015).map((it,k) => <option value={it}>{it}</option>)}
					</Input>
				</div>
				<br/>
					<Input type="select" addonBefore="Тариф" name="tariffid" value={this.state.tariffid} onChange={this.fieldChanged}>
						{this.props.tariffs.map((t,k) => <option value={t.id}>{t.name}</option>)}
					</Input>
					<Input type="text" addonBefore="Баланс" name="balance" value={this.state.balance} onChange={this.fieldChanged}/>
					<div className="input-group form-inline">
					<Button bsStyle="info" onClick={this.addCard}>Добавить</Button>&nbsp;{' '}
					<Button bsStyle="success" onClick={this.saveCard}>Сохранить</Button>&nbsp;{' '}
					<Button bsStyle="warning" onClick={this.undoCard}>Сбросить</Button>&nbsp;{' '}
					<Button bsStyle="danger" onClick={this.resetCard}>Очистить</Button>{' '}
					</div>
			</form>
		</div>
		);
	}
}

export default CardForm;