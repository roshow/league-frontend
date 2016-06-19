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
	let players = sessionStorage.getItem('players');
	if (!players) {
		Utils.getJson(`${WingRankerConstants.API_URL}/api/players`).then(function (response) {
			dispatchPlayersLoaded(response);
		});
	}
	else {
		dispatchPlayersLoaded(players);
	}
}

export default { getPlayers };