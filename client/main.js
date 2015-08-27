import React from 'react/addons';
import App from './../components/home/index';
import realsies from './../components/really';
var main = document.getElementsByTagName('main')[0];

console.log(realsies.oh())
React.render(<App />, main);