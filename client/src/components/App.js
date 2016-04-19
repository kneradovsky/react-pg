import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { Nav, NavItem } from 'react-bootstrap';

const App = (props) => {
  return (
    <div className="container-fluid">
    <div className="row">
    <div class="col-xl-1">{' '}</div>
    <div className="col-xl-10 container-fluid">
    <Nav bsStyle="pills">    	
      <NavItem href="/">Генерация транзакций</NavItem>
      <NavItem href="/GenerateTransactions">Транзакции</NavItem>
    </Nav>
      <br/>
      {props.children}
    </div>
    </div>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
