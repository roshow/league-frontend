import AppDispatcher from './../dispatcher/AppDispatcher';
import WingRankerConstants from './../constants/WingRankerConstants';
import Utils from './../utils/EveryoneUtils';

function damageRecorded (event={}) {
	let payload = Object.assign({
	  type: WingRankerConstants.DAMAGE_RECORDED,
	}, event);
	AppDispatcher.dispatch(payload);
	// console.log(payload);
}

function scoringTypeChanged (scoringType='official') {
	AppDispatcher.dispatch({
		type: WingRankerConstants.SCORINGTYPE_CHANGED,
		scoringType,
	});
}

function dispatchMatchesLoaded (matches=[]) {
	AppDispatcher.dispatch({
		type: WingRankerConstants.MATCHES_LOADED,
		matches,
	});
}

function updateMatches (division, week, season=2) {
	Utils.getJson(`${WingRankerConstants.API_URL}/api/matches/division/${division}/season/${season}/week/${week}`).then(function (matches) {
		dispatchMatchesLoaded(matches);
	});
}


export default { 
	damageRecorded,
	scoringTypeChanged,
	updateMatches,
};