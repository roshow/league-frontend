import keyMirror from 'keymirror';

const wingranker_constants = Object.assign({
		API_URL: 'https://nycxwing-league-api.herokuapp.com'
		// API_URL: 'http://localhost:9000'
	},
	keyMirror({
	  DAMAGE_RECORDED: null,
	  SCORINGTYPE_CHANGED: null,
	  MATCHES_LOADED: null,
	  RANKINGS_CHANGED: null,
}));

export default wingranker_constants;
