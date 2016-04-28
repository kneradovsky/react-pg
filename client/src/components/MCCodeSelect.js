/* eslint "react/jsx-key":"off" */

import React, { PropTypes } from 'react';
import { Button, Input } from 'react-bootstrap';
import ReactSuperSelect from 'react-super-select';

export class MCCodeSelect extends React.Component {
	static defaultProps = {
		mccodes : [],
		onSelectionChange: (e) => {},
		options : []
	}
	static propTypes = {
		mccodes: PropTypes.array.isRequired,
		onSelectionChange: PropTypes.func.isRequired,
		options: PropTypes.array
	}

	state = {
		value : {mcc: 0,description_ru: ''}
	}

	renderItem = (mcc) => {
		return(
			<div className="list-group-item">
				<h4 className="list-group-item-heading">{mcc.mcc}</h4>
				<span className="list-group-item-text">{mcc.description_ru}</span>
			</div>
		); 
	}
	filterCodes = (mcc,index,collection,searchTerm) => {
		return mcc.id.toString().indexOf(searchTerm)==0;
	}
	setValue = (mcc) => {
		this.setState({value:mcc});
		this.props.onSelectionChange(mcc);
	}

	render() {
		const options = this.props.mccodes.map((e) => {return {name: e.description_ru, id: e.mcc, ...e};});
		return (
			<div className="input-group">
				<span className="input-group-addon">MCC</span>
				<div className="list-group" >
					<ReactSuperSelect 
					dataSource={options}
					customFilterFunction={this.filterCodes}
					searchable={true}
					placeholder="Выберите код операции"
					searchPlaceholder="Начните вводить код"
					customOptionTemplateFunction={this.renderItem}
					value={this.state.value}
					onChange={this.setValue}
					/>
				</div>
			</div>
			);
	}

}

export default MCCodeSelect;