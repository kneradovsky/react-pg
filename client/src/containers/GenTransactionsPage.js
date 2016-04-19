import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/GenTransActions';
import { Button } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NewParamForm from '../components/NewParamForm';


export class GenTransactionsPage extends Component {
  render() {
    return (
      <div>
      <NewParamForm
        updateParameter = {this.props.actions.updateParameter}
        loadMCCCodes = {this.props.actions.loadMCCCodes}
        mccCodes = {this.props.mccCodes}
        param = {this.props.param}
      />
      <br/>
      <Button bsStyle="success" onClick={(e)=> this.props.actions.addNewParameter(this.props.param)}>Добавить</Button>
      <br/>
      <BootstrapTable data={this.props.sourceParameters} striped={true} hover={true}>
          <TableHeaderColumn isKey={true} dataField="type">Product ID</TableHeaderColumn>
          <TableHeaderColumn dataField="mcc">Product Name</TableHeaderColumn>
          <TableHeaderColumn dataField="card">Product Price</TableHeaderColumn>      
          <TableHeaderColumn dataField="currency">Product Price</TableHeaderColumn>      
          <TableHeaderColumn dataField="amount">Product Price</TableHeaderColumn>      
      </BootstrapTable>
      <Button bsStyle="warning">Генерация</Button>
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
