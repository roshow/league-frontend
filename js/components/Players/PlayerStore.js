import WingRankerConstants from './../../constants/WingRankerConstants';
import AppDispatcher from './../../dispatcher/AppDispatcher';
import EventEmitter from 'events';

let window = window;
let players = {};
let currentPlayer = {};

var PlayerStore = Object.assign({}, EventEmitter.prototype, {

	getAll: () => players,

  getCurrentPlayer: () => currentPlayer,

  emitChange () {
    this.emit(WingRankerConstants.CHANGE_EVENT);
  },

  addChangeListener (callback) {
    this.on(WingRankerConstants.CHANGE_EVENT, callback);
  },

  removeChangeListener (callback) {
    this.removeListener(WingRankerConstants.CHANGE_EVENT, callback);
  }

});

PlayerStore.dispatchToken = AppDispatcher.register( action => {

  switch(action.type) {
    case WingRankerConstants.PLAYER_LOADED:

      currentPlayer = action.player;
      PlayerStore.emitChange();

      break;
    case WingRankerConstants.ALL_PLAYERS_LOADED:
      let playersArr = action.players;
      var playersObj = {};
      for (var i = playersArr.length; i-- ;) {
        playersObj[playersArr[i].name] = playersArr[i];
      }
      console.log(playersObj);
      players = playersObj;
      PlayerStore.emitChange();

      break;
  }

});

export default PlayerStore;