import WingRankerConstants from './../constants/WingRankerConstants';
import WingRankerUtils from './../utils/WingRankerUtils.js';
import AppDispatcher from './../dispatcher/AppDispatcher';
import PlayerStore from './PlayerStore';
import EventEmitter from 'events';

const CHANGE_EVENT = 'change';

var players = PlayerStore.getAll();
var matches = [];

var makePlayer = player => ({
	id: player.id,
	name: 'player ' + player.id,
	damage_taken: Array.from(player.ships, ship => 0)
});

function newMatch (...matchPlayers) {
	var match = {
		points: [0, 0],
		players: Array.from(matchPlayers, makePlayer)
	};
	match.id = matches.length; // id is index array for now.
	matches.push(match);
	return match;
}

// create a match right away, just to keep things interesting...
newMatch(players[0],players[1]);

var MatchStore = Object.assign({}, EventEmitter.prototype, {

	getFirst: () => matches[0],

	getAll: () => matches,

  emitChange () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});


MatchStore.dispatchToken = AppDispatcher.register( action => {

  switch(action.type) {
    case WingRankerConstants.DAMAGE_RECORDED:
    	var { damage, match, player, ship } = action;
    	var {
			  [match]: {
			    players: {
			      [player]: {
			        damage_taken
			      }
			    }
			  }
			} = matches;
			damage_taken[ship] = damage;
			// matches[match].points = WingRankerUtils.calcMatchPoints(matches[match], players);
      MatchStore.emitChange();
      break;
  }
});

export default MatchStore;
