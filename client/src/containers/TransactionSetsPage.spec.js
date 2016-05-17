import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { TransactionSetsPage } from './TransactionSetsPage';
import { BootstrapTable } from 'react-bootstrap-table';

describe('<TransactionSetsPage />', () => {
  it('should contain <BootstrapTables />', () => {
    const wrapper = shallow(<TransactionSetsPage   
      transactionsets={[]} transactionset={{}} requestState={{}}/>);

    expect(wrapper.find(BootstrapTable)).to.be.length(2);
  });

});
