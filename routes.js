import React from 'react';
import {Route, DefaultRoute} from 'react-router';
import App from './js/components/app';
import HomeIndex from './js/components/home/index';
import ThinkingIndex from './js/components/thinking/index';

export default (
  <Route path='/' handler={App}>
    <DefaultRoute handler={HomeIndex} />
    <Route path="division/:division" handler={HomeIndex} />
    <Route path='thinking' handler={ThinkingIndex}>
    	<Route path="thought/:thoughtId" handler={ThinkingIndex} />
    </Route>
  </Route>
);