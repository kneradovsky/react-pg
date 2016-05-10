import React, { Component, PropTypes } from 'react';
import { Button, Input } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import urls from '../constants/backend';
import * as actions from '../actions/dataactions';
import CardForm from '../components/CardForm';
import PageLoader from '../components/Loader';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {entities  as dataEntities} from '../actions/dataactions';


export class CardsPage extends Component {
	static propTypes = {
		actions: PropTypes.object.isRequired,
		cards: PropTypes.array.isRequired,
		tariffs: PropTypes.array.isRequired,
		currentCard : PropTypes.object.isRequired,
		requestState : PropTypes.object.isRequired
	}
	static defaultProps = {
		currentCard : {},
		actions: {},
		cards : [],
		tariffs: []

	}
	state = {
		currentCard: {}
	}
	componentDidMount() {
		this.props.actions.entityOperation('card','index');
		this.props.actions.entityOperation('tariff','index');
	}
	saveCard = (card) => {
		this.props.actions.entityOperation('card','post',card);
	}
	render() {
	const selectRowProp = {
		mode: "checkbox",  //checkbox for multi select, radio for single select.
		clickToSelect: false,   //click row will trigger a selection on that row.
		bgColor: "rgb(238, 193, 213)"   //selected row background color
	};
	const options = {
		afterDeleteRow: (row) => {},
		onRowClick : (row) => {
			const newState = {
				...this.state,
				currentCard: row
			}
			this.setState(newState);
		}
	};		
	return(

	<div className="container-fluid">
		<PageLoader 
			inprog = {this.props.requestState.inprog}
			errors = {this.props.requestState.errors}
		/>  	
		<div className="row">
			<div className="col-md-8 col-lg-8">
			<BootstrapTable 
			selectRow={selectRowProp} 
			data={this.props.cards} 
			striped={true} hover={true} deleteRow={true}
			options={options}>
				<TableHeaderColumn isKey={true} dataField="id" hidden={true}>id</TableHeaderColumn>
				<TableHeaderColumn dataField="number">Номер</TableHeaderColumn>
				<TableHeaderColumn dataField="expdate">Дата истечения</TableHeaderColumn>
				<TableHeaderColumn dataField="tariffid">Тариф</TableHeaderColumn>      
				<TableHeaderColumn dataField="balance">Баланс</TableHeaderColumn>      
			</BootstrapTable>
			<br/>

				<form method="post" action={`${urls.cards}/uploadcsv`} encType="multipart/form-data" className="form-inline" >
					<Input type="file" addonBefore="список карт" name="csvfile"/>
					<Button type="submit" bsStyle="default">Отправить</Button>
				</form>
			</div>
			<div className="col-md-4 col-lg-4">
				<CardForm 
					card={this.state.currentCard}
					saveCard={this.saveCard}
					tariffs={this.props.tariffs}
				></CardForm>
			</div>
		</div>
	</div>
	)
	}
}

function mapStateToProps(state) {
  return {
	tariffs: state.tariffs,
	cards: state.cards,
	currentCard : state.activeCard,
	requestState : state.requestState
	};
}

function mapDispatchToProps(dispatch) {
  return {
		actions: bindActionCreators(actions, dispatch),
		optimistic: {
		}
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(CardsPage);
