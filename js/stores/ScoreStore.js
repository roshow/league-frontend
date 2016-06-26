import WingRankerConstants from './../constants/WingRankerConstants';
import WingRankerUtils from './../utils/WingRankerUtils.js';
import AppDispatcher from './../dispatcher/AppDispatcher';
import MatchStore from './MatchStore.js';
import EventEmitter from 'events';

const CHANGE_EVENT = 'change';

let rankings = [];


let ScoreStore = Object.assign({}, EventEmitter.prototype, {

  emitChange () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAll: () => scores,

  getRankings: () => rankings,

});


AppDispatcher.register( action => {

  switch(action.type) {

    case WingRankerConstants.RANKINGS_CHANGED:

      rankings = action.rankings;
      ScoreStore.emitChange();

      break;
  }

});

export default ScoreStore;
