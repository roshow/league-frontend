import WingRankerConstants from './../constants/WingRankerConstants';
import AppDispatcher from './../dispatcher/AppDispatcher';
import EventEmitter from 'events';

var players = [{
	"id": 0,
	"name": "Harrison",
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
	"name": "Mark",
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
},
{
	"id": 2,
	"name": "Carrie",
	"ships": [
		{
			"damage_cap": 8,
			"points": 48,
			"large_base": true
		},
		{
			"damage_cap": 8,
			"points": 48,
			"large_base": true
		}
	]
},
{
	"id": 3,
	"name": "Billy",
	"ships": [
		{
			"damage_cap": 3,
			"points": 12,
			"large_base": false
		},
		{
			"damage_cap": 3,
			"points": 12,
			"large_base": false
		},
		{
			"damage_cap": 6,
			"points": 37,
			"large_base": false
		},
		{
			"damage_cap": 5,
			"points": 39,
			"large_base": false
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