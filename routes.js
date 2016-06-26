import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import App from './js/components/app';
import HomeIndex from './js/components/home/index';

export default (
	 <Route path="/" component={HomeIndex}>
	 	<IndexRoute component={HomeIndex} />
    <Route path="rankings/:division/season/:season" component={HomeIndex}/>
		<Route path="schedule/:division/season/:season/week/:week" component={HomeIndex}/>
  </Route>
);