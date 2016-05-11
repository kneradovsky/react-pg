import React, { Component, PropTypes } from 'react';
import { Button, Input } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/dataactions';
import * as atypes from '../constants/actionTypes';
import CardRuleForm from '../components/CardRuleForm';
import PageLoader from '../components/Loader';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


export class CardRulesPage extends Component {
	static propTypes = {
		actions: PropTypes.object.isRequired,
		tariffs: PropTypes.array.isRequired,
		requestState : PropTypes.object.isRequired,
		cardrules: PropTypes.array.isRequired,
		cards : PropTypes.array.isRequired
	}
	static defaultProps = {
		actions: {},
		tariffs: [],
		requestState: {},
		cards : [],
		cardrules: []
	}
	state = {
		cardRule : {}
	}
	componentDidMount() {
		this.props.actions.entityOperation('cardrule','index');
		this.props.actions.entityOperation('tariff','index');
	}	
	updateActiveRule = (rule) => {
		this.setState({...this.state,cardRule:rule});
	}
	saveRule = (rule) => {
		this.props.actions.entityOperation('cardrule','post',rule,()=>actions.entityOperation('cardrule','index'));
	}
	deleteRule = (rule)	=> {
		this.props.actions.entityOperation('cardrule','delete',rule.id,()=>actions.entityOperation('cardrule','index'));
	}
	render() {
	const selectRowProp = {
		mode: "checkbox",  //checkbox for multi select, radio for single select.
		clickToSelect: false,   //click row will trigger a selection on that row.
		bgColor: "rgb(238, 193, 213)"   //selected row background color
	};
	const options = {
		afterDeleteRow: (row) => {},
		onRowClick : (row) => {this.updateActiveRule(row)}
	};		
	return(

	<div className="container-fluid">
		<PageLoader 
			inprog = {this.props.requestState.inprog}
			errors = {this.props.requestState.errors}
		/>  	
		<div className="row">
			<div className="col-md-5 col-lg-5">
			<CardRuleForm
				activeRule={this.state.cardRule}
				tariffs={this.props.tariffs}
				saveRule={this.saveRule}
				deleteRule={this.deleteRule}
				validateRule={this.validateRule}
			/>
			<br/>
			<BootstrapTable 
			selectRow={selectRowProp} 
			data={this.props.cardrules} 
			striped={true} hover={true} deleteRow={true}
			options={options}>
				<TableHeaderColumn isKey={true} dataField="id" hidden={true}>id</TableHeaderColumn>
				<TableHeaderColumn dataField="name">Имя</TableHeaderColumn>
				<TableHeaderColumn dataField="tariffid">Тариф</TableHeaderColumn>      
				<TableHeaderColumn dataField="expression">Выражение</TableHeaderColumn>      
			</BootstrapTable>
			</div>
			<div className="col-md-7 col-lg-7">
			<BootstrapTable 
			data={this.props.cards} 
			striped={true} hover={true} deleteRow={false}
			options={options}>
				<TableHeaderColumn isKey={true} dataField="id" hidden={true}>id</TableHeaderColumn>
				<TableHeaderColumn dataField="number">Номер</TableHeaderColumn>
				<TableHeaderColumn dataField="expdate">Дата истечения</TableHeaderColumn>
				<TableHeaderColumn dataField="tariff">Тариф</TableHeaderColumn>      
				<TableHeaderColumn dataField="balance">Баланс</TableHeaderColumn>      
			</BootstrapTable>
			</div>
		</div>
	</div>
	)
	}
}

function mapStateToProps(state) {
  return {
	tariffs: state.tariffs,
	cardrules: state.cardrules,
	requestState : state.requestState
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch)
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(CardRulesPage);
