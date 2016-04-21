import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/dataactions';
import { Button, Input } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NewParamForm from '../components/NewParamForm';


export class GenTransactionsPage extends Component {
  
  state = {
    ...this.props
  }

  paramSetsChanged = (e) => {
    let newState = {...this.state};
    console.log(e.target)
    newState[e.target.name]=e.target.value;
    this.setState(newState);
    this.actions.selectParameterSet(e.target.value);
  }


  paramSetNameChanged = (e) => {
    let newState = {...this.state};
    newState[e.target.name]=e.target.value;
    this.setState(newState);
  }

  saveParamSet = (e) => {
    const nameval = this.state.paramSetName;
    const ps = this.props.sourceParameters.map((p,i) => {return {name:nameval, ...p}});
    console.log(ps);
    this.props.actions.saveParameterSet(ps);
  }

  componentDidMount() {
    this.props.actions.getMCCCodes();
    this.props.actions.getCurrencies();
    this.props.actions.getParameterSetNames();
  }

  loadParamsSet = (e) => {
    console.log("loadParamsSet");
    console.log(this.state);
    console.log(this.props);
    this.props.actions.getParameterSet(this.state.paramSetName)
  }

  render() {
    return (
      <div>
      <NewParamForm
        addNewParameter = {this.props.actions.addNewParameter}
        mccodes = {this.props.mccodes}
        currencies = {this.props.currencies}
      />
      <br/>
      <form className="form-inline">
        <div className="form-group">
          <label htmlFor="paramSets">Загрузить</label>
          <Input type="select" addonBefore="Набор" name="paramSet" value={this.state.paramSetName} onChange={this.paramSetsChanged}>
            {this.props.paramsets.map((e,i)=><option value="{e}">{e}</option>)}
          </Input>
        </div>
        {' '}
        <Button bsStyle="success" onClick={this.loadParamsSet}>Загрузить</Button>{' '}
      </form>
      {' '}
      <BootstrapTable data={this.props.sourceParameters} striped={true} hover={true}>
          <TableHeaderColumn isKey={true} dataField="type">Тип</TableHeaderColumn>
          <TableHeaderColumn dataField="mcc">Код</TableHeaderColumn>
          <TableHeaderColumn dataField="card">Карта</TableHeaderColumn>      
          <TableHeaderColumn dataField="currency">Валюта</TableHeaderColumn>      
          <TableHeaderColumn dataField="amount">Количество</TableHeaderColumn>      
      </BootstrapTable>
      <br/>
      <form className="form-inline">
        <div className="form-group">
          <label htmlFor="paramSetName">Имя набора параметров</label>
          <Input type="text" name="paramSetName" value={this.state.paramSetName} onChange={this.paramSetNameChanged}/>
        </div>
        {' '}
        <Button bsStyle="success" onClick={this.saveParamSet}>Сохранить</Button>{' '}
        <Button bsStyle="warning">Генерация</Button>{' '}
      </form>
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
  paramSetName : PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    mccodes: state.mcccodes,
    currencies: state.currencies,
    sourceParameters : state.sourceParameters,
    paramsets : state.paramsets,
    paramSetName : ''
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
