import AppDispatcher from './../dispatcher/AppDispatcher';
import WingRankerConstants from './../constants/WingRankerConstants';
import Utils from './../utils/EveryoneUtils';
import WingRankerUtils from './../utils/WingRankerUtils.js';

function dispatchMatchesLoaded (rankings) {
	AppDispatcher.dispatch({
		type: WingRankerConstants.RANKINGS_CHANGED,
		rankings,
	});
}

function loadRankings (division, season) {
	const cached = WingRankerUtils.getSessionCache(`rankings`, division, season);
	if (cached) {
		dispatchMatchesLoaded(cached);
	}
	else {
		Utils.getJson(`${WingRankerConstants.API_URL}/api/rankings/season/${season}/division/${division}`).then(function (rankings) {
			WingRankerUtils.setSessionCache(rankings, `rankings`, division, season);
			dispatchMatchesLoaded(rankings);
		});
	}
}

export default { loadRankings };