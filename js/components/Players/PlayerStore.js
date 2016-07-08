import WingRankerConstants from './../../constants/WingRankerConstants';
import AppDispatcher from './../../dispatcher/AppDispatcher';
import EventEmitter from 'events';

let window = window;
let players = window ? window.PLAYERS : {};
let currentPlayer = {
  "name": "marekmarcinkiewicz",
  "matches": [],
  "division": {
    "1": "ultima",
    "2": "ultima"
  },
  "print_name": "Marek Marcinkiewicz"
};

var PlayerStore = Object.assign({}, EventEmitter.prototype, {

	getAll: () => players,

  getCurrentPlayer: () => currentPlayer,

  emitChange () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener (callback) {
    this.removeListener(WingRankerConstants.CHANGE_EVENT, callback);
  }

});

export default PlayerStore;