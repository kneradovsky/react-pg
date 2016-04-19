import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/GenTransActions';
import { Button, Input } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NewParamForm from '../components/NewParamForm';


export class GenTransactionsPage extends Component {
  render() {
    return (
      <div>
      <NewParamForm
        addNewParameter = {this.props.actions.addNewParameter}
        loadMCCCodes = {this.props.actions.loadMCCCodes}
        mccCodes = {this.props.mccCodes}
      />
      <br/>
      <form className="form-inline">
        <div className="form-group">
          <label htmlFor="paramSetName">Загрузить</label>
          <Input type="select" addonBefore="Набор" name="paramSetName" value={this.props.actions.parameterSets}/>
        </div>
        {' '}
        <Button bsStyle="success">Загрузить</Button>{' '}
      </form>

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
          <Input type="text" name="paramSetName" value={this.props.appState.paramSetName}/>
        </div>
        {' '}
        <Button bsStyle="success">Сохранить</Button>{' '}
        <Button bsStyle="warning">Генерация</Button>{' '}
      </form>
      </div>
    );
  }
}

GenTransactionsPage.propTypes = {
  actions: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
  sourceParameters: PropTypes.array.isRequired,
  mccCodes: PropTypes.array.isRequired,
  param:PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    appState: {  },
    mccCodes: [],
    sourceParameters : state.sourceParameters,
    param : state.updateParameter
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
