import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { GenTransactionsPage } from './GenTransactionsPage';
import { NewParamForm } from '../components/NewParamForm';
import { Button } from 'react-bootstrap';

describe('<GenTransactionsPage />', () => {
  it('should contain <Button />', () => {
    const actions = {
      generateTransactions: () => { },
    };
    const appState = { };
    const wrapper = shallow(<GenTransactionsPage actions={actions} appState={appState}/>);

    expect(wrapper.find(Button)).to.be.length(3);
  });
  it('should contain <NewParamForm />', () => {
    const actions = {
      generateTransactions: () => { },
    };
    const appState = { };
    const wrapper = shallow(<GenTransactionsPage actions={actions} appState={appState}/>);

    expect(wrapper.find(NewParamForm)).to.be.length(1);
  });

});
