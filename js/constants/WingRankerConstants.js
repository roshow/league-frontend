import keyMirror from 'keymirror';

const wingranker_constants = Object.assign({
		API_URL: 'https://nycxwing-league-api.herokuapp.com'
	},
	keyMirror({
	  DAMAGE_RECORDED: null,
	  SCORINGTYPE_CHANGED: null,
	  MATCHES_LOADED: null,
	  RANKINGS_CHANGED: null,
}));

wingranker_constants.API_URL = 'http://localhost:9000';

export default wingranker_constants;
