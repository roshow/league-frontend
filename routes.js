import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import App from './js/components/app';
import HomeIndex from './js/components/home/index';
import Matches from './js/components/home/Match';
import Rankings from './js/components/home/Rankings';
import Players from './js/components/Players/Players';

export default (
	 <Route path="/" component={HomeIndex}>
	 	<IndexRoute component={Rankings} />
	 	<Route path="players" component={Players}/>
    <Route path="rankings/:division/season/:season" component={Rankings}/>
		<Route path="schedule/:division/season/:season/week/:week" component={Matches}/>
  </Route>
);