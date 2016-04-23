import React from 'react';
import PlayerStore from './../../stores/PlayerStore';
import ScoreStore from './../../stores/ScoreStore';
import ScoreActions from './../../actions/ScoreActions';
import MatchStore from './../../stores/MatchStore';
import MatchActions from './../../actions/MatchActions';
import Rankings from './Rankings';
import Matches from './Match';


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
        week: week,
      }, getStateFromStores());
      // console.log('current state of affairs: ', this.state);
  }
  render () {
    let { rankings, matches, division, week } = this.state;
    let divisions = ['ultima', 'argent'];
    let divEls = divisions.map( div => {
      let classes = ( div === division) ? "active" : "";
      return <li className={classes} key={div}><a href={`/division/${div}`}>{div.toUpperCase()}</a></li>
    });
    let headerImgStyles = {
      width: '100%',
      maxWidth: '750px'
    };
    return (
      <div className="container">
        <div>
          <img src="/images/nycxleague_banner_750.jpg" style={headerImgStyles}/>
        </div>
        <ul className="nav nav-tabs">
          {divEls}
        </ul>
        { week ? (<Matches matches={matches} />) : (<Rankings rankings={rankings} />) }
      </div>
    )
  }

  componentDidMount () {
    let { division, week } = this.state;
    ScoreStore.addChangeListener(this._onChange);
    ScoreActions.getRankings(division);
    MatchStore.addChangeListener(this._onChange);
    if (week >= 0) { 
      MatchActions.updateMatches(division, week);
    }
  }

  componentWillUnmount () {
    ScoreStore.removeChangeListener(this._onChange);  
    MatchStore.removeChangeListener(this._onChange);  
  }
}