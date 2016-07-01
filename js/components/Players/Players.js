import React from 'react';
import PlayerStore from './PlayerStore';



export default class PlayersSection extends React.Component {
	constructor () {
		super();
	}

	render () {
		const players = this.props.players;
		const playersLi = Object.keys(players).sort().map( (key) => {
			return <li className="list-group-item" key={`players-${key}`}>{players[key].print_name}</li>
		});
		return (
			<div className="container matches-container">
				<ul className="list-group">
					{playersLi}
				</ul>
			</div>
		);
	}
}