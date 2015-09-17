import React from 'react';
import {Route, DefaultRoute} from 'react-router';
import App from './js/components/app';
import HomeIndex from './js/components/home/index';
import ToDoIndex from './js/components/todo/index';

export default (
  <Route path='/' handler={App}>
    <DefaultRoute handler={ToDoIndex} />
    <Route path='todo' handler={ToDoIndex} />
    <Route path='oldhome' handler={HomeIndex} />
  </Route>
);