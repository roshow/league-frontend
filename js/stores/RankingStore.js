import WingRankerConstants from './../constants/WingRankerConstants';
import AppDispatcher from './../dispatcher/AppDispatcher';
import EventEmitter from 'events';

const CHANGE_EVENT = 'change';

var RankingStore = Object.assign({}, EventEmitter.prototype, {

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
      RankingStore.emitChange();
      break;
  }
});

export default RankingStore;

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
