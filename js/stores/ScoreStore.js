import WingRankerConstants from './../constants/WingRankerConstants';
import WingRankerUtils from './../utils/WingRankerUtils.js';
import AppDispatcher from './../dispatcher/AppDispatcher';
import MatchStore from './MatchStore.js';
import EventEmitter from 'events';

const CHANGE_EVENT = 'change';

var matches = MatchStore.getAll();
var players = MatchStore.getPlayers();

var scores = players.map( player => ({
  id: player.id,
  matches: {},
}) );

var calcTournamentPoints = (player, opponent) => ( player > opponent ) ? ( player === 100 || ( player > opponent + 12 ) ? 5 : 3 ) : ( player === opponent ) ? 1 : 0;

function updateMatchScore (matchId) {
  
  var matchPoints = WingRankerUtils.calcMatchPoints(matches[matchId], players);
  var [playerOne, playerTwo] = matches[matchId].players;
  scores[playerOne.id].matches[matchId] = {
    mov: matchPoints[0],
    tournament_points: calcTournamentPoints(...matchPoints),
  };
  scores[playerTwo.id].matches[matchId] = {
    mov: matchPoints[1],
    tournament_points: calcTournamentPoints(...matchPoints.reverse()),
  };
  console.log(scores);

}

var ScoreStore = Object.assign({}, EventEmitter.prototype, {

  getAll: () => scores,

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

      AppDispatcher.waitFor([MatchStore.dispatchToken]);
      matches = MatchStore.getAll();

      updateMatchScore(action.match);
      ScoreStore.emitChange();

      break;
  }
});

export default ScoreStore;
