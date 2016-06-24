import React from 'react';
import PlayerStore from './../../stores/PlayerStore';
import ScoreStore from './../../stores/ScoreStore';
import ScoreActions from './../../actions/ScoreActions';
import MatchStore from './../../stores/MatchStore';
import MatchActions from './../../actions/MatchActions';
import Rankings from './Rankings';
import Matches from './Match';
import WingRankerConstants from './../../constants/WingRankerConstants';


function getStateFromStores() {
  var rounds = [{ id: 0, matches: [0,1] },{ id: 1, matches: [2,3]}];
  return {
    rankings: ScoreStore.getRankings(),
    matches: MatchStore.getMatches()
  };
}



export default class HomeIndex extends React.Component {
  constructor ({ params: { division, week, season} }) {
      super();

      this._onChange = () => {
        this.setState(getStateFromStores());
      };

      this.state = Object.assign({
        division: division,
        season: parseInt(season, 10),
        week: parseInt(week, 10),
        players: {},
      }, getStateFromStores());
      // console.log('current state of affairs: ', this.state);
  }
  render () {
    let { rankings, matches, division, week, players, season } = this.state;
    let divisions = ['argent', 'ultima'];
    let seasonEls = [1, 2].map( seasonNo => {
      let classes = ( seasonNo === season) ? "active" : "";
      let targetUrl = week ? `/division/${division}/season/${seasonNo}/week/${week}` : `/rankings/division/${division}/season/${seasonNo}`;
      return <li className={classes} key={'sN' + seasonNo}><a href={targetUrl}>SEASON {seasonNo}</a></li>
    });
    let divEls = divisions.map( div => {
      let classes = ( div === division) ? "active" : "";
      return <li className={classes} key={div}><a href={`/rankings/division/${div}/season/${season}`}>{div.toUpperCase()}</a></li>
    });
    let weekNavStyles = {
      display: week ? 'block' : 'none'
    };
    let mainContainerClasses ='container';
    mainContainerClasses += (week ? ' matches-container' : '');
    return (
      <section>
        <div className="container">
          <img className="header-image" src="/images/nycxleague_banner_750.jpg" />
        </div>
        <div className="container">
          <ul className="nav nav-pills pull-left">
            {seasonEls}
          </ul>
          <ul className="nav nav-pills pull-left">
            {divEls}
          </ul>
          <ul className="nav nav-pills pull-right">
            <li className={ !week ? 'active' : '' } ><a href={`/rankings/division/${division}/season/${season}`}>Standings</a></li>
            <li className={ week ? 'active' : '' } ><a href={`/division/${division}/season/${season}/week/1`}>Schedule</a></li>
          </ul>
          <ul className="nav nav-pills pull-left" style={weekNavStyles}>
          { 
            [1,2,3,4,5,6,7].map( weekNo => {
              let className = weekNo ===  week ? "active" : "";
              return <li className={className} key={`week${weekNo}`}><a href={`/division/${division}/season/${season}/week/${weekNo}`} >Week {weekNo}</a></li>
            })
          }
          </ul>
        </div>
        <div className={mainContainerClasses}>
          { week ? (<Matches matches={matches} players={players} />) : (<Rankings rankings={rankings} players={players}/>) }
        </div>
      </section>
    )
  }

  componentDidMount () {
    let { division, week, season } = this.state;
    // this.state.players = window.PLAYERS;
    // console.log(window.PLAYERS);
    this.setState({
      players: window.PLAYERS
    })
    this.setState({ players: window.PLAYERS });
    ScoreStore.addChangeListener(this._onChange);
    MatchStore.addChangeListener(this._onChange);
    if (week >= 0) { 
      MatchActions.updateMatches(division, week, season);
    }
    else {
      ScoreActions.loadRankings(division, season);
    }
  }

  componentWillUnmount () {
    ScoreStore.removeChangeListener(this._onChange);  
    MatchStore.removeChangeListener(this._onChange);
  }
}