import React from 'react';
import MatchInput from './MatchInput';
import MatchActions from './../../actions/MatchActions';
import ThoughtActions from './../../actions/ThoughtActions';
import WingRankerUtils from './../../utils/WingRankerUtils';



export default class MatchSection extends React.Component {
	constructor () {
		super();
	}

	markWinner (id, winner) {
		return id === winner ? (<sup>*</sup>) : (<span></span>);
	};

	render () {
    var matches = this.props.matches;
    var players = this.props.players;

    var matchesHtml = matches.map( (match, match_index) => (
      <ul className="list-group" key={match.id}>
        <li>
          <h4 className="text-center">{players[match.players[0].id].name} vs. {players[match.players[1].id].name}</h4>
        </li>
        { match.players.map( (player, player_index) => (
          <li className="list-group-item" key={player_index} >
            <strong>{players[player.id].name}</strong>
            <ul>
              { player.damage_taken.map( (damage, ship_index) => {
                var ship = players[player.id].ships[ship_index];
                return (
                <li key={ship_index}>
                  ship {ship_index + 1}: <MatchInput 
                    damage={damage}
                    maxValue={ship.damage_cap}
                    matchId={match.id}
                    playerIndex={player_index}
                    shipIndex={ship_index}
                    onSave={this._onDamageRecorded.bind(this)} 
                  /> (damage) / {ship.damage_cap}, {ship.points} points{ship.large_base ? ' (large base)' : ''}
                </li>
                )
              })}
            </ul>
          </li>
        )) }
      </ul>
      ))

    return (
    <div>
      {matchesHtml}
    </div>
    );
  }

  _onDamageRecorded (damage, player, ship, match) {
    ThoughtActions.showRandomThought();
  	MatchActions.damageRecorded({
  		match,
  		damage,
  		player,
  		ship,
  	});
  }
}