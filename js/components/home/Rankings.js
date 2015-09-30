import React from 'react';
import WingRankerUtils from './../../utils/WingRankerUtils';

export default class MatchSection extends React.Component {
	constructor () {
		super();
	}

	render () {
		// var matchUp = this.props.match.players;
		// var allPlayers = this.props.players;
		var { scores, players } = this.props;
		return (
			<div>
				<ul>
					{players.map( player => {
						return (
						<li key={player.id}>
							<h2>{player.name} {scores[player.id].overall.tournament_points}|{scores[player.id].overall.mov}</h2>
						</li>
						);
					} )}
				</ul>
			</div>
		);
	}
}