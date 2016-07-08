import AppDispatcher from './../dispatcher/AppDispatcher';
import WingRankerConstants from './../constants/WingRankerConstants';
import Utils from './../utils/EveryoneUtils';
import WingRankerUtils from './../utils/WingRankerUtils';


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

function dispatchPlayerLoaded (player) {
	AppDispatcher.dispatch({
		type: WingRankerConstants.PLAYER_LOADED,
		player,
	});
}

function updateCurrentPlayer (playername) {
	const cachedPlayer = WingRankerUtils.getSessionCache(`player`, playername);
	if (!cachedPlayer) {
		Utils.getJson(`${WingRankerConstants.API_URL}/api/players/${playername}`).then(function (player) {
			WingRankerUtils.setSessionCache(player, `player`, playername);
			dispatchPlayerLoaded(player);
		});
	}
	else {
		dispatchPlayerLoaded(cachedPlayer);
	}
}

export default { 
	getPlayers,
	updateCurrentPlayer,
};