import React from 'react';
import {Router, Route, IndexRoute, IndexRedirect} from 'react-router';
import App from './js/components/app';
import HomeIndex from './js/components/home/index';
import Matches from './js/components/home/Match';
import MatchesIndex from './js/components/home/MatchesIndex';
import Rankings from './js/components/home/Rankings';
import Players from './js/components/Players/Players';

export default (
	 <Route path="/" component={HomeIndex}>
	 	<IndexRedirect to="/rankings/argent/season/2" />
	 	<Route path="players" component={Players}/>
    <Route path="rankings/:division/season/:season" component={Rankings}/>
		<Route path="schedule/:division/season/:season/week/:week" component={MatchesIndex}/>
  </Route>
);