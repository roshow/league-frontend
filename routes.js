import React from 'react';
import {Route, DefaultRoute} from 'react-router';
import App from './components/app';
import HomeIndex from './components/home/index';
import ToDoIndex from './components/todo/index';

export default (
  <Route path='/' handler={App}>
    <DefaultRoute handler={HomeIndex} />
    <Route path='todo' handler={ToDoIndex} />
  </Route>
);