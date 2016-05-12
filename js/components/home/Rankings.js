import React from 'react';
import WingRankerUtils from './../../utils/WingRankerUtils';

export default class RankingsSection extends React.Component {
	constructor () {
		super();
	}

	render () {
		let { rankings, players } = this.props;
		let _tableStyles = {};

		let playerScores = rankings.map( (player) => (
		  <tr key={player.name}>
		    <td>{players[player.name].print_name}</td>
		    <td>{player.lp}</td>
		    <td>{player.mov}</td>
		    <td>{player.games_played}</td>
		  </tr>
		));

		return (
		<table className="table" style={_tableStyles}>
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

