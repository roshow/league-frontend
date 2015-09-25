import AppDispatcher from './../dispatcher/AppDispatcher';
import WingRankerConstants from './../constants/WingRankerConstants';

function damageRecorded (event={}) {
	let payload = Object.assign({
	  type: WingRankerConstants.DAMAGE_RECORDED,
	}, event);
	AppDispatcher.dispatch(payload);
	// console.log(payload);
}

export default { 
	damageRecorded,
};