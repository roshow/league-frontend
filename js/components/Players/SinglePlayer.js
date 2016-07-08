import React from 'react';import { Link } from 'react-router';
import Matches from './../home/Match';



export default class SinglePlayerSection extends React.Component {
	constructor () {
		super();
	}

	render () {
		console.log(this.props);
		return (
			<div className="container">
				<h3>Player Name</h3>
				<h4>Season 1</h4>
				<h5>Division: Argent</h5>
				<h5>Matches:</h5>
				<Matches matches={this.props.matches} />
			</div>
		);
	}
}