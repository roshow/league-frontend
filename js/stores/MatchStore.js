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
      MatchStore.emitChange();
      break;
  }
});

export default MatchStore;
