import React from 'react';
import { Link } from 'react-router';
import Subnav from './../Subnav/Subnav';

export default class Nav extends React.Component {
	constructor () {
		super();
	}

	render () {
		let { rankings, matches, division, week, players, season } = this.props;
		season = parseInt(season, 10);
		week = parseInt(week, 10);
    const seasonEls = [1, 2].map( seasonNo => {
      let classes = ( seasonNo === season) ? "active" : "";
      let targetUrl = week ? `/schedule/${division}/season/${seasonNo}/week/${week}` : `/rankings/${division}/season/${seasonNo}`;
      return <li className={classes} key={'sN' + seasonNo}><Link to={targetUrl}>Season {seasonNo}</Link></li>
    });

		return (
			<nav>
				<div className="container">
	        <ul className="nav nav-pills pull-left">
	          {seasonEls}
	          <li><Link to="/players">PLAYERS</Link></li>
	        </ul>
	        <a className="btn btn-default active pull-right" href="https://docs.google.com/document/d/1-AXYE46sRZqTRRYZujhrJ-BvSg5bcNnMH0RCEBgUG7o/edit?usp=sharing" role="button">League Info</a>
	      </div>
      </nav>
		)
	}
}