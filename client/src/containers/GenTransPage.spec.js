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
    const appState = { 
      paramsets : []
    };
    const wrapper = shallow(<GenTransactionsPage actions={actions} appState={appState} paramsets={[]}/>);

    expect(wrapper.find(Button)).to.be.length(3);
  });

});
