import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { Nav, NavItem } from 'react-bootstrap';

const App = (props) => {
  return (
    <div className="row">
    <div className="col-lg-12 col-lg-offset-3 text-center">
    <Nav bsStyle="pills">    	
      <NavItem><IndexLink to="/">Генерация транзакций</IndexLink></NavItem>
      <NavItem><Link to="/GenerateTransactions">Транзакции</Link></NavItem>
    </Nav>
      <br/>
      {props.children}
    </div>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
