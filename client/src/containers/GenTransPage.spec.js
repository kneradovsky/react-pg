import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { GenTransactionsPage } from './GenTransactionsPage';
import TransParams from '../components/GenParams';
import { Button } from 'react-bootstrap';

describe('<GenTransactionsPage />', () => {
  it('should contain <Button />', () => {
    const actions = {
      generateTransactions: () => { },
    };
    const appState = { };
    const wrapper = shallow(<GenTransactionsPage actions={actions} appState={appState}/>);

    expect(wrapper.find(Button)).to.be.length(2);
  });
  it('should contain <TransParams />', () => {
    const actions = {
      generateTransactions: () => { },
    };
    const appState = { };
    const wrapper = shallow(<GenTransactionsPage actions={actions} appState={appState}/>);

    expect(wrapper.find(TransParams)).to.be.length(1);
  });

});
