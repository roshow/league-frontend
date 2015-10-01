import WingRankerConstants from './../constants/WingRankerConstants';
import WingRankerUtils from './../utils/WingRankerUtils.js';
import AppDispatcher from './../dispatcher/AppDispatcher';
import PlayerStore from './PlayerStore';
import MatchStore from './MatchStore.js';
import EventEmitter from 'events';

const CHANGE_EVENT = 'change';

var matches = MatchStore.getAll();
var players = PlayerStore.getAll();
var scoringType = 'official';

var scores = players.map( player => ({
  id: player.id,
  overall: {
    tournament_points: 0,
    mov: 0,
  },
  matches: {},
}) );

function updateMatchScore (matchId) {
  
  var match = matches[matchId];
  var matchPoints = WingRankerUtils.calcMatchPoints(match, players, scoringType);
  var mov = WingRankerUtils.calcMov(matchPoints);
  var tournamentPoints = WingRankerUtils.calcTournamentPoints(matchPoints);
  var [player1, player2] = match.players;

  match.players.forEach( (player, index) => {
    scores[player.id].matches[matchId] = {
      mov: mov[index],
      tournament_points: tournamentPoints[index],
      sos: 9,
    };
  });
  
  updatePlayerOverall(player1.id);  
  updatePlayerOverall(player2.id);
}

function updatePlayerOverall (playerId) {
  var player = scores[playerId];
  var overall = Object.keys(player.matches).reduce( (combined, key) => {
    var match = player.matches[key];
    combined.tournament_points += match.tournament_points;
    combined.mov += match.mov;
    return combined;
  }, {
    tournament_points: 0,
    mov: 0,
  });
  player.overall = overall;
}

function updateAllMatchScores () {
  Object.keys(matches).forEach(updateMatchScore);
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

    case WingRankerConstants.SCORINGTYPE_CHANGED:

      AppDispatcher.waitFor([MatchStore.dispatchToken]);
      matches = MatchStore.getAll();
      updateAllMatchScores();
      ScoreStore.emitChange();

      break;
  }

});

export default ScoreStore;
