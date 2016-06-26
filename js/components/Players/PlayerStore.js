import WingRankerConstants from './../../constants/WingRankerConstants';
import AppDispatcher from './../../dispatcher/AppDispatcher';
import EventEmitter from 'events';

let window = window;
let players = window ? window.PLAYERS : {};
console.log('players: ', players);

var PlayerStore = Object.assign({}, EventEmitter.prototype, {

	getAll: () => players,

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