import WingRankerConstants from './../constants/WingRankerConstants';
import AppDispatcher from './../dispatcher/AppDispatcher';
import EventEmitter from 'events';

var players = [{
	"id": 0,
	"name": "Han",
	"ships": [
		{
			"damage_cap": 13,
			"points": 57,
			"large_base": true
		},
		{
			"damage_cap": 5,
			"points": 42,
			"large_base": false 
		}
	]
},
{
	"id": 1,
	"name": "Bossk",
	"ships": [
		{
			"damage_cap": 8,
			"points": 26,
			"large_base": false
		},
		{
			"damage_cap": 8,
			"points": 26,
			"large_base": false
		},
		{
			"damage_cap": 12,
			"points": 48,
			"large_base": true
		}
	]
}];

var PlayerStore = Object.assign({}, EventEmitter.prototype, {

	getAll: () => players,

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

export default PlayerStore;