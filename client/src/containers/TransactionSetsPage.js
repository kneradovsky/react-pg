/* eslint "react/jsx-key":"off", "react/no-set-state":"off" */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Input } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import * as actionTypes from '../constants/actionTypes';
import * as dataactions from '../actions/dataactions';
import PageLoader from '../components/Loader';
import GenerateFile from '../components/GenerateFile';

export class TransactionSetsPage extends Component {
	static propTypes = {
		actions: PropTypes.object.isRequired,
		optimistic: PropTypes.object.isRequired,
		transactionsets: PropTypes.array.isRequired,
		transactionset: PropTypes.array.isRequired,
		requestState : PropTypes.object.isRequired
	}
	static defaultProps = {
		actions: {},
		optimistic: {}
	}
	state = {
		psetName : '<не выбрано>',
		transactionsets : []
	}
	componentDidMount() {
		this.props.actions.entityOperation('transactionset','index');
	}
	componentWillReceiveProps(newprops) {
		const tsets = newprops.transactionsets.map((ts,i) => ({id:i+1,name:ts}));
		this.setState({...newprops,transactionsets:tsets});
	}
	deleteTransactionSet = (id) =>  {
		const tset = this.state.transactionsets[id-1];
		this.props.actions.entityOperation('transactionset','delete',tset.name);
		const filtered =this.state.transactionsets.filter(i => i.id!=id);
		this.props.optimistic.updateTransactionSet(filtered); //delete paramset name from the list
		if(this.state.psetName==tset.name)
			this.props.actions.emitAction(actionTypes.GET_TRANSACTIONSET,{res:{data:[]}}); //clear currently selected traction set if it's being deleted
	}
	render() {
	const selectRowProp = {
		mode: "checkbox",  //checkbox for multi select, radio for single select.
		clickToSelect: false,   //click row will trigger a selection on that row.
		bgColor: "rgb(238, 193, 213)"   //selected row background color
	};
	const options = {
		afterDeleteRow: this.deleteTransactionSet,
		onRowClick : (row) => {this.setState({psetName:row.name});this.props.actions.entityOperation('transactionset','get',row.name);}
	};
	return (
	<div className="container-fluid">
	<PageLoader 
		inprog = {this.props.requestState.inprog}
		errors = {this.props.requestState.errors}
	/>    
	<div className="row">
	<div className="col-md-2 col-lg-2">
	<h4>Наборы параметров генерации</h4>
		<BootstrapTable 
		selectRow={selectRowProp} 
		data={this.state.transactionsets} 
		striped={true} hover={true} deleteRow={true}
		options={options}>
			<TableHeaderColumn isKey={true} dataField="id" hidden={true}>id</TableHeaderColumn>
			<TableHeaderColumn width="80" dataField="name">Имя</TableHeaderColumn>
		</BootstrapTable>
		</div>
		<div className="col-md-10 col-lg-10"> 
		<h4>Набор транзакций для {this.state.psetName}</h4>
		<GenerateFile paramSetName={this.state.psetName}/>
		<BootstrapTable 
		selectRow={{}} 
		data={this.props.transactionset} 
		striped={true} hover={true} deleteRow={false}
		options={{}}>
			<TableHeaderColumn isKey={true} dataField="id" hidden={true}>id</TableHeaderColumn>
			<TableHeaderColumn dataField="type" width="20">Тип</TableHeaderColumn>
			<TableHeaderColumn dataField="mcc" width="50">Код</TableHeaderColumn>
			<TableHeaderColumn dataField="card" width="100">Карта</TableHeaderColumn>      
			<TableHeaderColumn dataField="currency" width="50">Валюта</TableHeaderColumn>      
			<TableHeaderColumn dataField="amount" width="100">Количество</TableHeaderColumn>
			<TableHeaderColumn dataField="country" width="100">Страна</TableHeaderColumn>
		</BootstrapTable>
		</div>
		</div>
		</div>
	);
		
	}	
}

function mapStateToProps(state) {
	return {
		transactionsets : state.transactionsets,
		transactionset : state.transactionset,
		requestState : state.requestState
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(dataactions, dispatch),
		optimistic: {
			updateTransactionSet: (newSets) => {dispatch({type: actionTypes.LOAD_TRANSACTIONSETS, res: {data:newSets}});}
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TransactionSetsPage);