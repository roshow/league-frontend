import React from 'react';
import WingRankerUtils from './../../utils/WingRankerUtils';
import ScoreStore from './../../stores/ScoreStore';
import Subnav from './../Subnav/Subnav';

export default class RankingsSection extends React.Component {
	constructor () {
		super();
	}

	render () {
		const { players } = this.props;
		const playerScores = ScoreStore.getRankings().map( (player) => {
			const printname = players[player.name] ? players[player.name].print_name : player.name;
			return (
			  <tr key={player.name}>
			    <td>{printname}</td>
			    <td>{player.lp}</td>
			    <td>{player.mov}</td>
			    <td>{player.games_played}</td>
			  </tr>
			);
		});

		return (
			<section>
				<Subnav {...this.props} />
				<div className="container">
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
					</table>
				</div>
			</section>
		);
	}
}

