/* eslint "react/jsx-key":"off" */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/dataactions';
import { Button, Input } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NewParamForm from '../components/NewParamForm';
import urls from '../constants/backend';


export class GenTransactionsPage extends Component {
  
  state = {
    paramSetName : '',
    seqNum : '1',
    sourceParameters: this.props.sourceParameters
  }


  componentDidMount() {
    this.props.actions.getMCCCodes();
    this.props.actions.getCurrencies();
    this.props.actions.getParameterSetNames();
  }

  saveParamSet = (e) => {
    const nameval = this.state.paramSetName;
      const ps = this.props.sourceParameters.map((p,i) => {return {name:nameval, ...p};});
    this.props.actions.saveParameterSet(ps);
  }


  loadParamsSet = (e) => {
    this.props.actions.getParameterSet(this.state.paramSetName);
  }

  fieldChanged = (e) => {
    let newState = {...this.state};
    if(e.target.name=='pset')
      newState['paramSetName']=e.target.value;
    else 
      newState[e.target.name]=e.target.value;
    this.setState(newState);
  }

  componentWillReceiveProps(nextprops) {
    if(this.state.paramSetName == '' && nextprops.paramsets.length>0)
      this.fieldChanged({target:{name: 'pset', value:nextprops.paramsets[0]}});    
  }

  generateTransactions = (e) => {
    window.open(urls.transactions+"/"+this.state.paramSetName+"/"+this.state.seqNum);
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
      <form className="form-inline">
        <div className="form-group">
          <Input type="select" addonBefore="Набор" name="pset" value={this.state.paramSetName} onChange={this.fieldChanged} on>
            {this.props.paramsets.map((e,i)=><option value={e}>{e}</option>)}
          </Input>
        </div>
        {' '}
        <Button bsStyle="success" onClick={this.loadParamsSet}>Загрузить</Button>{' '}
        </form>
        <br/>
        {' '}
        <form className="form-inline">
        <div className="form-group">
          <Input type="text" addonBefore="Имя набора" name="paramSetName" value={this.state.paramSetName} onChange={this.fieldChanged}/>{' '}
          <Input type="text" addonBefore="Номер файла" name="seqNum" value={this.state.seqNum} onChange={this.fieldChanged} size="2"/>{' '}
        </div>
        <div className="form-group">          
          <Button bsStyle="success" onClick={this.saveParamSet}>Сохранить</Button>{' '}
          <Button bsStyle="warning" onClick={this.generateTransactions}>Генерация</Button>{' '}
        </div>
        {' '}
        <br/>
      </form>

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
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GenTransactionsPage);
