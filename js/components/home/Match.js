import React from 'react';
import MatchInput from './MatchInput';
import MatchActions from './../../actions/MatchActions';



export default class MatchSection extends React.Component {
	constructor () {
		super();
	}

	render () {
	    var match = this.props.match;
	    return (
	    	<ul>
	        { match.players.map( (player, player_index) => (
	        
	        <li key={player_index} >
	          <h4>{player.name}</h4>
	          <ul>
	            { player.damage_taken.map( (damage, ship_index) => (
	            
	            <li key={ship_index}>
	              ship {ship_index + 1}: 
	              <MatchInput 
	                damage={damage}
	                playerIndex={player_index}
	                shipIndex={ship_index}
	                onSave={this.onDamageInput.bind(this)} 
	              />
	              : {damage}
	            </li>
	            
	            )) }
	          </ul>
	        </li>
	        
	        )) }
	      </ul>
	      )
	  }

	  onDamageInput (damage, player, ship) {
	  	var action = {
	  		match: this.props.match.id,
	  		damage,
	  		player,
	  		ship,
	  	}
	  	MatchActions.damageRecorded(action);
	  }
}