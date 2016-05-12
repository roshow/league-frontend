import AppDispatcher from './../dispatcher/AppDispatcher';
import WingRankerConstants from './../constants/WingRankerConstants';
import Utils from './../utils/EveryoneUtils';

function dispatchMatchesLoaded (players) {
	AppDispatcher.dispatch({
		type: WingRankerConstants.PLAYERS_LOADED,
		players,
	});
}

function getPlayers () {
	Utils.getJson(`${WingRankerConstants.API_URL}/api/players`).then(function (players) {
		dispatchPlayersLoaded(players);
	});
}

export default { getPlayers };