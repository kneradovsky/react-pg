/* eslint "react/jsx-key":"off" */
import React, { Component, PropTypes } from 'react';
import { Button, Input } from 'react-bootstrap';
import urls from '../constants/backend';

export class GenParametersForm extends Component {

  static defaultProps = {
    paramsets :[],
    loadParametersSet : (psetName) => {},
    saveParametersSet : (psetName) => {},
    deleteParametersSet: (psetName) => {}
  }

  static propTypes = {
    paramsets: PropTypes.object.isRequired,
    loadParametersSet: PropTypes.func.isRequired,
    saveParametersSet: PropTypes.func.isRequired,
    deleteParametersSet: PropTypes.func.isRequired
  }
  
  state= {
    paramsets : this.props.paramsets,
    paramSetName : this.props.paramsets[0] || '',
    seqNum : '1'
  }

  componentWillReceiveProps(nextprops) {
    if(nextprops.paramsets.length>0)
      if(this.state.paramSetName == '' || nextprops.paramsets.indexOf(this.state.paramSetName)==-1) {
        const psname = nextprops.paramsets[0];
        this.fieldChanged({target:{name: 'pset', value:psname}});
        this.props.loadParametersSet(psname);
      }
  }


  fieldChanged = (e) => {
    let newState = {...this.state};
    if(e.target.name=='pset')
      newState['paramSetName']=e.target.value;
    else 
      newState[e.target.name]=e.target.value;
    this.setState(newState);
  }

  saveParamSet = (e) => {
    this.props.saveParametersSet(this.state.paramSetName);
  }

  loadParamSet = (e) => {
    this.props.loadParametersSet(this.state.paramSetName);
  }  

  deleteParamSet = (e) => {
    if(confirm(`Удалить набор ${this.state.paramSetName}?`))
      this.props.deleteParametersSet(this.state.paramSetName);
  }

  generateTransactions = (e) => {
    window.open(urls.transactions+"/"+this.state.paramSetName+"/"+this.state.seqNum);
  }



  render() {
    return(
      <div>
      <form className="form-inline">
        <div className="form-group">
          <Input type="select" addonBefore="Набор" name="pset" value={this.state.paramSetName} onChange={this.fieldChanged} on>
            {this.props.paramsets.map((e,i)=><option value={e}>{e}</option>)}
          </Input>
        </div>
        {' '}
        <Button bsStyle="success" onClick={this.loadParamSet}>Загрузить</Button>{' '}
        </form>
        <br/>
        {' '}
        <form className="form-inline">
        <div className="form-group">
          <Input type="text" addonBefore="Имя набора" name="paramSetName" value={this.state.paramSetName} onChange={this.fieldChanged}/>{' '}
          <Button bsStyle="success" onClick={this.saveParamSet}>Сохранить</Button>{' '}
          <Button bsStyle="danger" onClick={this.deleteParamSet}>Удалить</Button>
        </div>
        {' '}
        <div className="form-group">
          <Input type="text" addonBefore="Номер файла" name="seqNum" value={this.state.seqNum} onChange={this.fieldChanged} size="2"/>{' '}
          <Button bsStyle="warning" onClick={this.generateTransactions}>Генерация</Button>{' '}
        </div>
        {' '}
        <br/>
      </form>
      </div>
      );
  }


}

export default GenParametersForm;