import React from 'react';
import PlayerStore from './PlayerStore';



export default class PlayersSection extends React.Component {
	constructor () {
		super();
	}

	render () {
		const players = this.props.players;
		console.log(players);
		const playersLi = Object.keys(players).sort().map( (key) => {
			return <li className="list-group-item">{players[key].print_name}</li>
		});
		return (
			<div>
				<ul className="list-group">
					{playersLi}
				</ul>
			</div>
		);
	}
}