/* eslint "react/jsx-key":"off" */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/dataactions';
import { Button, Input } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NewParamForm from '../components/NewParamForm';
import GenParametersForm from '../components/GenParametersForm';
import * as actionTypes from '../constants/actionTypes';


export class GenTransactionsPage extends Component {
  
  state = {
    sourceParameters: this.props.sourceParameters
  }

  componentDidMount() {
    this.props.actions.getMCCCodes();
    this.props.actions.getCurrencies();
    this.props.actions.getParameterSetNames();
  }

  saveParamSet = (psetName) => {
    const ps = this.props.sourceParameters.map((p,i) => {return {...p,name:psetName};});
    this.props.actions.saveParameterSet(ps); 
    if(this.props.paramsets.indexOf(psetName)==-1) //doesn't exist in the array
      this.props.optimistic.updateParamsets(this.props.paramsets.concat(psetName)) //add it locally
  }

  deleteParamSet = (psetName) =>  {
    this.props.actions.deleteParameterSet(psetName);
    const filtered =this.props.paramsets.filter(i => i!=psetName);
    this.props.optimistic.updateParamsets(filtered); //delete paramset name from the list
  }


  parameters = this.props.sourceParameters;  

  render() {
    const selectRowProp = {
      mode: "checkbox",  //checkbox for multi select, radio for single select.
      clickToSelect: false,   //click row will trigger a selection on that row.
      bgColor: "rgb(238, 193, 213)"   //selected row background color
    };
    const options = {
      afterDeleteRow: this.props.actions.deleteParameters
    };

    console.log("GenTransactionsPage render")
    return (
    <div className="container-fluid">
    <div className="row">
    <div className="col-md-4 col-lg-4">
      <NewParamForm
        addNewParameter = {this.props.actions.addNewParameter}
        mccodes = {this.props.mccodes}
        currencies = {this.props.currencies}
      />
      <br/>
      </div>
      <div className="col-md-8 col-lg-8">
      <GenParametersForm
        paramsets = {this.props.paramsets}
        loadParametersSet = {this.props.actions.getParameterSet}
        saveParametersSet = {this.saveParamSet}
        deleteParametersSet = {this.deleteParamSet}
        updateParamsets = {this.props.optimistic.updateParamsets}
      />
      <br/>
      <BootstrapTable 
        selectRow={selectRowProp} 
        data={this.props.sourceParameters} 
        striped={true} hover={true} deleteRow={true}
        options={options}>
          <TableHeaderColumn isKey={true} dataField="id" hidden={true}>id</TableHeaderColumn>
          <TableHeaderColumn dataField="type">Тип</TableHeaderColumn>
          <TableHeaderColumn dataField="mcc">Код</TableHeaderColumn>
          <TableHeaderColumn dataField="card">Карта</TableHeaderColumn>      
          <TableHeaderColumn dataField="currency">Валюта</TableHeaderColumn>      
          <TableHeaderColumn dataField="amount">Количество</TableHeaderColumn>      
      </BootstrapTable>
      </div>
      </div>
      </div>
    );
  }
}

GenTransactionsPage.propTypes = {
  actions: PropTypes.object.isRequired,
  optimistic: PropTypes.object.isRequired,
  sourceParameters: PropTypes.array.isRequired,
  mccodes: PropTypes.array.isRequired,
  currencies: PropTypes.array.isRequired,
  paramsets : PropTypes.array.isRequired,
  paramSetName : PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    mccodes: state.mcccodes,
    currencies: state.currencies,
    sourceParameters : state.sourceParameters,
    paramsets : state.paramsets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    optimistic: {
      updateMCCCodes: (codes) => {dispatch({type: actionTypes.GET_MCC_CODES, res: {data:codes}});},
      updateParamsets: (names) => {dispatch({type: actionTypes.GET_PARAMETER_SETS_NAMES, res: {data:names}});}
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GenTransactionsPage);
