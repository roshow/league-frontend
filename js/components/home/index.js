import React from 'react';
import PlayerStore from './../../stores/PlayerStore';
import ScoreStore from './../../stores/ScoreStore';
import ScoreActions from './../../actions/ScoreActions';
import MatchStore from './../../stores/MatchStore';
import MatchActions from './../../actions/MatchActions';
import Rankings from './Rankings';
import Matches from './Match';


function getStateFromStores(currentRound) {
  currentRound = currentRound || 0;
  var rounds = [{ id: 0, matches: [0,1] },{ id: 1, matches: [2,3]}];
  return {
    rankings: ScoreStore.getRankings(),
    matches: MatchStore.getMatches()
  };
}



export default class HomeIndex extends React.Component {
  constructor ({ params: { division, week } }) {
      super();

      this.DIVISION = division;
      this.WEEK = week;

      this._onChange = () => {
        this.setState(getStateFromStores());
      };

      this.state = getStateFromStores();
      // console.log('current state of affairs: ', this.state);
  }
  render () {
    let { rankings, matches } = this.state;
    let divisions = ['ultima', 'argent'];
    let divEls = divisions.map( div => {
      let classes = ( div === this.DIVISION ) ? "active" : "";
      return <li className={classes} key={div}><a href={`/division/${div}`}>{div.toUpperCase()}</a></li>
    });
    // return (
    //   <div className="container">
    //     <div>
    //       <img src="/images/nycxleague_banner_750.jpg" />
    //     </div>
    //     <ul className="nav nav-tabs">
    //       {divEls}
    //     </ul>
    //     <Rankings rankings={rankings} />
    //   </div>
    // )
    return (
      <div className="container">
        <div>
          <img src="/images/nycxleague_banner_750.jpg" />
        </div>
        <ul className="nav nav-tabs">
          {divEls}
        </ul>
        <Matches matches={matches} />
      </div>
    )
  }

  componentDidMount () {
    ScoreStore.addChangeListener(this._onChange);
    ScoreActions.getRankings(this.DIVISION);
    MatchStore.addChangeListener(this._onChange);
    if (this.WEEK >= 0) { 
      MatchActions.updateMatches(this.DIVISION, this.WEEK);
    }
  }

  componentWillUnmount () {
    ScoreStore.removeChangeListener(this._onChange);  
    MatchStore.removeChangeListener(this._onChange);  
  }
}