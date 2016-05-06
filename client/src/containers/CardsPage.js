import React, { Component, PropTypes } from 'react';
import { Button, Input } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import urls from '../constants/backend';


export class CardsPage extends Component {
	static propTypes = {

	}
	render() {
	return(
	<div className="container-fluid">
	<div className="row">
		<form method="post" action={`${urls.cards}/uploadcsv`} encType="multipart/form-data" className="form-inline" >
			<Input type="file" addonBefore="список карт" name="csvfile"/>
			<Button type="submit" bsStyle="default">Отправить</Button>
		</form>
    </div>
    </div>
	)
	}
}

export default CardsPage;