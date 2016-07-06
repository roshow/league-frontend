import React from 'react';
import { Link } from 'react-router';

export default class Subnav extends React.Component {
	constructor () {
		super();
	}

	render () {
		let { rankings, matches, division='argent', week, players, season=1 } = this.props;
		season = parseInt(season, 10);
		week = parseInt(week, 10);


    const divisionEls = ['argent', 'ultima'].map( div => {
      let classes = ( div === division) ? "active" : "";
      return <li className={classes} key={div}><Link to={`/rankings/${div}/season/${season}`}>{div.toUpperCase()}</Link></li>
    });

		return (
			<nav>
	      <div className="container">
	        <ul className="nav nav-pills pull-left">
	          {divisionEls}
	        </ul>
	        <ul className="nav nav-pills pull-right">
	          <li className={ !week ? 'active' : '' } ><Link to={`/rankings/${division}/season/${season}`}>Standings</Link></li>
	          <li className={ week ? 'active' : '' } ><Link to={`/schedule/${division}/season/${season}/week/1`}>Schedule</Link></li>
	        </ul>
	        
	        	{ 
	        		// only render week elements when needed
		        	week ? (
			        	<ul className="nav nav-pills pull-left">
			        	{
			        		[1,2,3,4,5,6,7].map( weekNo => {
							      let className = weekNo ===  week ? "active" : "";
							      return <li className={className} key={`week${weekNo}`}><Link to={`/schedule/${division}/season/${season}/week/${weekNo}`} >Week {weekNo}</Link></li>
							    } )
			        	} 
			        	</ul>
		        	) : null
	        	}
	      </div>
      </nav>
		)
	}
}