import React, { Component, PropTypes } from 'react';
import { Button, Input } from 'react-bootstrap';
import urls from '../constants/backend';

export class GenerateFile extends React.Component {
	static defaultProps = {
		seqNum : 1,
		paramSetName: ''
	}

	static propTypes = {
		seqNum : PropTypes.number,
		paramSetName: PropTypes.string.isRequired
	}

	state= {
		seqNum : '1'
	}
	fieldChanged = (e) => {
		let newState = {...this.state};
		newState[e.target.name]=e.target.value;
		this.setState(newState);
	}

	generateTransactions = (e) => {
		window.open(urls.transactions+"/"+this.props.paramSetName+"/"+this.state.seqNum);
	}

	render() {
		return(
			<form className="form-inline">
	<div className="form-group">
		<Input type="text" addonBefore="Номер файла" name="seqNum" value={this.state.seqNum} onChange={this.fieldChanged} size="2"/>{' '}
		<Button bsStyle="warning" onClick={this.generateTransactions}>Генерация</Button>{' '}
	</div>		
	</form>
	);
	}
}

export default GenerateFile;