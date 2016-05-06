/* eslint "react/jsx-key":"off" */
import React, { Component, PropTypes } from 'react';

export class PageLoader extends Component {
	static defaultProps = {
		inprog : 0,
		errors : []
	}
	static propTypes = {
		inprog: PropTypes.number.isRequired,
		errors: PropTypes.array.isRequired
	}	
	state = {
		...this.props
	}
	render() {
		if(this.props.inprog==0 && this.props.errors.length==0) return (<div></div>);
		return (
			<div className="well loader">
			<h3>
			<span className="glyphicon glyphicon-time"></span>
			Обмен данными с сервером <span className="badge">{this.props.inprog}</span>
			</h3>
			<ErrorComponent errors={this.props.errors}/>
			</div>
			)
	}	
}

class ErrorComponent extends Component {
	static defaultProps = {
		errors : []
	}
	static propTypes = {
		errors: PropTypes.array.isRequired
	}	
	state = {
		...this.props
	}
	render() {
		if(this.props.errors.length==0) return (<div></div>)
		return (
			<div className="alert alert-danger" role="alert">
			<h4>
			<span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
			Ошибки обмена
			</h4>
			<ul className="list-group">
			{this.props.errors.map((err,i) => <li className="list-group-item">{err.toString()}</li>)}
			</ul>
			</div>
		);
	}
}

export default PageLoader;