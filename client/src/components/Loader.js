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
	componentWillReceiveProps(newprops) {
		this.setState(newprops);
	}
	render() {
		if(this.state.inprog==0 && this.state.errors.length==0) return (<div></div>);
		return (
			<div className="well loader">
			<span className="glyphicon glyphicon-remove-circle" style={{'float':'right'}} onClick={(e)=>this.setState({errors:[],inprog:0})}></span>
			<h3>
			<span className="glyphicon glyphicon-time"></span>
			Обмен данными с сервером <span className="badge">{this.state.inprog}</span>
			</h3>
			<ErrorsComponent errors={this.state.errors}/>
			</div>
			);
	}	
}

class ErrorsComponent extends Component {
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
		if(this.props.errors.length==0) return (<div></div>);
		return (
			<div className="alert alert-danger" role="alert">
			<h4>
			<span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
			Ошибки обмена
			</h4>
			<ul className="list-group">
			{this.props.errors.map((err,i) => <ErrorComponent error={err}/>)}
			</ul>
			</div>
		);
	}
}

class ErrorComponent extends Component {
	static defaultProps = {
		error : {}
	}
	static propTypes = {
		error: PropTypes.object.isRequired
	}	
	state = {
		...this.props
	}
	render() {
		const err = this.props.error;
		const desc = Object.keys(err).length>0 ? Object.keys(err).map((k,v) => `${k}:${err[k]}\n`) : err.message; 
		return(
			<li className="list-group-item">{desc}</li>
		);
	}
}

export default PageLoader;