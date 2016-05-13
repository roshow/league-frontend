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
  constructor ({ params: { division, week } }) {
      super();

      this._onChange = () => {
        this.setState(getStateFromStores());
      };

      this.state = Object.assign({
        division: division,
        week: parseInt(week, 10),
        players: {},
      }, getStateFromStores());
      // console.log('current state of affairs: ', this.state);
  }
  render () {
    let { rankings, matches, division, week, players } = this.state;
    let divisions = ['ultima', 'argent'];
    let divEls = divisions.map( div => {
      let classes = ( div === division) ? "active" : "";
      return <li className={classes} key={div}><a href={`/division/${div}`}>{div.toUpperCase()}</a></li>
    });
    let headerImgStyles = {
      width: '100%',
      maxWidth: '750px'
    };
    let weekNavStyles = {
      display: week ? 'block' : 'none'
    };
    return (
      <section>
        <div className="container">
          <div>
            <img src="/images/nycxleague_banner_750.jpg" style={headerImgStyles}/>
          </div>
          <ul className="nav nav-pills pull-left">
            {divEls}
          </ul>
          <ul className="nav nav-pills pull-right">
            <li><a href={`/division/${division}`} >Standings</a></li>
            <li><a href={`/division/${division}/week/1`} >Schedule</a></li>
          </ul>
          <ul className="nav nav-pills pull-left" style={weekNavStyles}>
          { 
            [1,2,3,4,5,6,7].map( weekNo => {
              let className = weekNo ===  week ? "active" : "";
              return <li className={className} key={`week${weekNo}`}><a href={`/division/${division}/week/${weekNo}`} >Week {weekNo}</a></li>
            })
          }
          </ul>
        </div>
        <div className="container">
          { week ? (<Matches matches={matches} players={players} />) : (<Rankings rankings={rankings} players={players}/>) }
        </div>
      </section>
    )
  }

  componentDidMount () {
    let { division, week } = this.state;
    // this.state.players = window.PLAYERS;
    // console.log(window.PLAYERS);
    this.setState({
      players: window.PLAYERS
    })
    this.setState({ players: window.PLAYERS });
    ScoreStore.addChangeListener(this._onChange);
    MatchStore.addChangeListener(this._onChange);
    if (week >= 0) { 
      MatchActions.updateMatches(division, week);
    }
    else {
      ScoreActions.getRankings(division);
    }
  }

  componentWillUnmount () {
    ScoreStore.removeChangeListener(this._onChange);  
    MatchStore.removeChangeListener(this._onChange);
  }
}