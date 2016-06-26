import React from 'react';
import { Link } from 'react-router';

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
      return <li className={classes} key={'sN' + seasonNo}><Link to={targetUrl}>SEASON {seasonNo}</Link></li>
    });
    const divEls = ['argent', 'ultima'].map( div => {
      let classes = ( div === division) ? "active" : "";
      return <li className={classes} key={div}><Link to={`/rankings/${div}/season/${season}`}>{div.toUpperCase()}</Link></li>
    });
    let weekNavStyles = {
      display: week ? 'block' : 'none'
    };
    const weekEls = [1,2,3,4,5,6,7].map( weekNo => {
      let className = weekNo ===  week ? "active" : "";
      return <li className={className} key={`week${weekNo}`}><Link to={`/schedule/${division}/season/${season}/week/${weekNo}`} >Week {weekNo}</Link></li>
    });

		return (
			<nav>
				<div className="container">
	        <ul className="nav nav-pills pull-left">
	          {seasonEls}
	        </ul>
	      </div>
	      <div className="container">
	        <ul className="nav nav-pills pull-left">
	          {divEls}
	        </ul>
	        <ul className="nav nav-pills pull-right">
	          <li className={ !week ? 'active' : '' } ><Link to={`/rankings/${division}/season/${season}`}>Standings</Link></li>
	          <li className={ week ? 'active' : '' } ><Link to={`/schedule/${division}/season/${season}/week/1`}>Schedule</Link></li>
	        </ul>
	        <ul className="nav nav-pills pull-left" style={weekNavStyles}>
	        	{weekEls}
	        </ul>
	      </div>
      </nav>
		)
	}
}