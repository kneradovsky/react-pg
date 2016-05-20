import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { GenTransactionsPage } from './GenTransactionsPage';
import { NewParamForm } from '../components/NewParamForm';
import {GenParametersForm } from '../components/GenParametersForm';


describe('<GenTransactionsPage />', () => {
  it('should contain <Button />', () => {
    const actions = {
      generateTransactions: () => { },
    };
    const appState = { 
      paramsets : []
    };
    const wrapper = shallow(<GenTransactionsPage actions={actions} appState={appState} paramsets={[]} requestState={{}}/>);

    expect(wrapper.find(GenParametersForm)).to.be.length(1);
    expect(wrapper.find(NewParamForm)).to.be.length(1);
  });

});
