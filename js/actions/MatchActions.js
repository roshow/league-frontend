import AppDispatcher from './../dispatcher/AppDispatcher';
import WingRankerConstants from './../constants/WingRankerConstants';
import Utils from './../utils/EveryoneUtils';
import WingRankerUtils from './../utils/WingRankerUtils.js';


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

function updateMatches (division, week, season) {
	const cached = WingRankerUtils.getSessionCache(`schedule`, division, season, week);
	if (cached) {
		dispatchMatchesLoaded(cached);
	}
	else {
		Utils.getJson(`${WingRankerConstants.API_URL}/api/matches/division/${division}/season/${season}/week/${week}`).then(function (matches) {
			WingRankerUtils.setSessionCache(matches, `schedule`, division, season, week);
			dispatchMatchesLoaded(matches);
		});
	}
}


export default { 
	updateMatches,
};