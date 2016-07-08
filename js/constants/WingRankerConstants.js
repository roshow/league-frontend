import keyMirror from 'keymirror';

import SHARED from './../sharedConstants';

const wingranker_constants = Object.assign({
		API_URL: SHARED.APIURL,
		CHANGE_EVENT: 'change',
	},
	keyMirror({
	  DAMAGE_RECORDED: null,
	  SCORINGTYPE_CHANGED: null,
	  MATCHES_LOADED: null,
	  RANKINGS_CHANGED: null,
	  PLAYER_LOADED: null,
}));

export default wingranker_constants;
