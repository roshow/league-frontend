import WingRankerConstants from './../constants/WingRankerConstants';
import AppDispatcher from './../dispatcher/AppDispatcher';
import EventEmitter from 'events';

const CHANGE_EVENT = 'change';

var matches = [{
	"id": 0,
	"players": [
		{
			"id": 0,
			"name": "han",
			"damage_taken": [0, 0]
		},
		{
			"id": 1,
			"name": "bossk",
			"damage_taken": [0, 0, 0]
		}
	]
	
}];

var players = [{
	"id": 0,
	"name": "han",
	"ships": [
		{
			"damage_cap": 13,
			"points": 57
		},
		{
			"damage_cap": 5,
			"points": 42 
		}
	]
},
{
	"id": 1,
	"name": "bossk",
	"ships": [
		{
			"damage_cap": 8,
			"points": 26
		},
		{
			"damage_cap": 8,
			"points": 26
		},
		{
			"damage_cap": 12,
			"points": 48
		}
	]
}];

var MatchesStore = Object.assign({}, EventEmitter.prototype, {

	getFirst () {
		return matches[0];
	},

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


AppDispatcher.register( action => {

  switch(action.type) {
    case WingRankerConstants.DAMAGE_RECORDED:
    	console.log('Matches Store Got the Action, chief.');
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
      MatchesStore.emitChange();
      break;
  }
});

export default MatchesStore;

// function match_points (match) {
// 	let matchpoints = match.map(function ({id, damage_taken}) {
// 		let ships = players_mockdata[id].ships
// 		let points = ships
// 			.map(({damage_cap, points}, i) => Math.floor(damage_taken[i] * (points/damage_cap)))
// 			.reduce((a, b) => a + b)
// 		if (points === ships.reduce(({points: a}, {points: b}) => a + b)) {
// 			return 100;
// 		}
// 		return points;
// 	});
// 	[matchpoints[1], matchpoints[0]] = [matchpoints[0], matchpoints[1]];
// 	return matchpoints;
// }
