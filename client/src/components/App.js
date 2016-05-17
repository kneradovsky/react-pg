import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { Nav, NavItem } from 'react-bootstrap';

const App = (props) => {
  return (
    <div className="container-fluid">
    <div className="row">
    <div className="col-xl-1 container-fluid">
    <Nav bsStyle="pills">    	
      <NavItem href="/">Параметры генерации транзакций</NavItem>
      <NavItem href="/Home/Transactions">Наборы транзакций</NavItem>
      <NavItem href="/Home/Cards">Карты</NavItem>
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
