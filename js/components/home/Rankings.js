import React from 'react';
import WingRankerUtils from './../../utils/WingRankerUtils';
import ScoreStore from './../../stores/ScoreStore';

export default class RankingsSection extends React.Component {
	constructor () {
		super();
	}

	render () {
		const { players } = this.props;

		let playerScores = ScoreStore.getRankings().map( (player) => {
			return (
			  <tr key={player.name}>
			    <td>{players[player.name].print_name}</td>
			    <td>{player.lp}</td>
			    <td>{player.mov}</td>
			    <td>{player.games_played}</td>
			  </tr>
			);
		});

		return (
		<table className="table">
			<thead>
			  <tr>
			    <th>Player Name</th>
			    <th>Points</th>
			    <th>MOV</th>
			    <th>Games Played</th>
			  </tr>
			</thead>
			<tbody>
				{playerScores}
			</tbody>
		</table>);
	}
}

