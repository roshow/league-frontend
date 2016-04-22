import React from 'react';
import {Route, DefaultRoute} from 'react-router';
import App from './js/components/app';
import HomeIndex from './js/components/home/index';

export default (
  <Route path='/' handler={App}>
    <DefaultRoute handler={HomeIndex} />
    <Route path="division/:division" handler={HomeIndex} />
    <Route path="division/:division/week/:week" handler={HomeIndex} />
  </Route>
);