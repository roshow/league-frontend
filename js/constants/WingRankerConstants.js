import keyMirror from 'keymirror';

import SHARED from './../sharedConstants';

const wingranker_constants = Object.assign({
		API_URL: SHARED.APIURL
	},
	keyMirror({
	  DAMAGE_RECORDED: null,
	  SCORINGTYPE_CHANGED: null,
	  MATCHES_LOADED: null,
	  RANKINGS_CHANGED: null,
}));

export default wingranker_constants;
