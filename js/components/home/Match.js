import React from 'react';
import MatchInput from './MatchInput';
import MatchActions from './../../actions/MatchActions';
import WingRankerUtils from './../../utils/WingRankerUtils';



export default class MatchSection extends React.Component {
	constructor () {
		super();
	}

	markWinner (id, winner) {
		return id === winner ? (<sup>*</sup>) : (<span></span>);
	};

	render () {
    var match = this.props.match;
    var players = this.props.players;
    var winnerIndex = WingRankerUtils.calcMatchPoints(match, players).reduce( (a, b) => ((a >= b) ? 0 : 1) ); // ok, reduce.
    var winnerId = match.players[winnerIndex].id;

    return (

    	<ul>
        { match.players.map( (player, player_index) => (
        
        <li key={player_index} >
          <h4>{player.name}{ this.markWinner(player.id, winnerId) }</h4>
          <ul>
            { player.damage_taken.map( (damage, ship_index) => {
            	var ship = players[player.id].ships[ship_index];
	            return (
	            <li key={ship_index}>
	              ship {ship_index + 1}:&nbsp;
	              <MatchInput 
	                damage={damage}
	                maxValue={ship.damage_cap}
	                playerIndex={player_index}
	                shipIndex={ship_index}
	                onSave={this._onDamageRecorded.bind(this)} 
	              />/{ship.damage_cap} ({ship.points} points{ship.large_base ? ', large' : ''})
	            </li>
	            ) 
          }) }
          </ul>
        </li>
        
        )) }
      </ul>
      
      );
  }

  _onDamageRecorded (damage, player, ship) {
  	MatchActions.damageRecorded({
  		match: this.props.match.id,
  		damage,
  		player,
  		ship,
  	});
  }
}