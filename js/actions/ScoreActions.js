import AppDispatcher from './../dispatcher/AppDispatcher';
import WingRankerConstants from './../constants/WingRankerConstants';
import Utils from './../utils/EveryoneUtils';

function dispatchMatchesLoaded (rankings) {
	AppDispatcher.dispatch({
		type: WingRankerConstants.RANKINGS_CHANGED,
		rankings,
	});
}

function getRankings (division) {
	Utils.getJson(`${WingRankerConstants.API_URL}/api/rankings/${division}`).then(function (rankings) {
		dispatchMatchesLoaded(rankings);
	});
}

export default { getRankings };