import AppDispatcher from './../dispatcher/AppDispatcher';
import WingRankerConstants from './../constants/WingRankerConstants';

function scoringTypeChanged (scoringType='official') {
	AppDispatcher.dispatch({
		type: WingRankerConstants.SCORINGTYPE_CHANGED,
		scoringType,
	});
}

export default { 
	scoringTypeChanged,
};