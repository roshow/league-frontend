import React from 'react';
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router';
import routes from '../routes';

var main = document.getElementsByTagName('main')[0];
render(<Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory} routes={routes} />, main);