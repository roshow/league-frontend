import React from 'react';
import WingRankerUtils from './../../utils/WingRankerUtils';

export default class MatchSection extends React.Component {
	constructor () {
		super();
	}

	render () {
		var { scores, players } = this.props;
		var _tableStyles = {};

		var playerScores = WingRankerUtils.rankScores(scores).map( (score, index) => (
		  <tr key={score.id}>
		    <td>{players[score.id].name}</td>
		    <td>{score.overall.tournament_points}</td>
		    <td>{score.overall.mov}</td>
		    <td>{score.overall.sos}</td>
		  </tr>
		));

		return (
		<table className="table" style={_tableStyles}>
			<thead>
			  <tr>
			    <th>Player</th>
			    <th>Score</th>
			    <th>MOV</th>
			    <th>SoS</th>
			  </tr>
			</thead>
			<tbody>
				{playerScores}
			</tbody>
		</table>);
	}
}

