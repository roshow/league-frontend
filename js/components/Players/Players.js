import React from 'react';
import PlayerStore from './PlayerStore';
import { Link } from 'react-router';



export default class PlayersSection extends React.Component {
	constructor () {
		super();
	}

	render () {
		const players = this.props.players;
		const uLStyle = {
			textAlign: 'center'
		};
		const playersLi = Object.keys(players).sort().map( (key) => {
			return <li className="list-group-item" key={`players-${key}`} ><Link to="/">{players[key].print_name}</Link></li>
		});
		return (
			<div className="container matches-container">
				<ul className="list-group" style={uLStyle}>
					{playersLi}
				</ul>
			</div>
		);
	}
}