import AppDispatcher from './../dispatcher/AppDispatcher';
import WingRankerConstants from './../constants/WingRankerConstants';

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

export default { 
	damageRecorded,
	scoringTypeChanged,
};