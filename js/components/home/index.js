import React from 'react';
import ScoreStore from './../../stores/ScoreStore';
import ScoreActions from './../../actions/ScoreActions';
import MatchStore from './../../stores/MatchStore';
import MatchActions from './../../actions/MatchActions';
import Banner from './../Banner/Banner';
import PlayerStore from './../Players/PlayerStore';
import Nav from './../Nav/Nav';
import Rankings from './Rankings';
import Matches from './Match';
import WingRankerConstants from './../../constants/WingRankerConstants';
import { Link } from 'react-router';


function getStateFromStores() {
  return {
    rankings: ScoreStore.getRankings(),
    matches: MatchStore.getMatches()
  };
}



export default class HomeIndex extends React.Component {
  constructor ({ params: { division, week, season} }) {
      super();
      this._onChange = () => {
        this.setState(this.getState());
      };
      this.state = Object.assign({
        division: division || 'argent',
        season: parseInt(season || 2, 10),
        week: parseInt(week, 10),
        players: {},
      }, this.getState());
  }

  getState () {
    return {
      rankings: ScoreStore.getRankings(),
      matches: MatchStore.getMatches(),
    };

  }
  render () {
    const { rankings, matches, division, week, players, season } = this.state;
    let mainContainerClasses ='container';
    mainContainerClasses += (week ? ' matches-container' : '');
    return (
      <section>
        <Banner season={season}/>
        <Nav {...this.state} />
        <div className={mainContainerClasses}>
          { React.cloneElement(this.props.children, { players: players }) }
        </div>
      </section>
    )
  }

  componentDidMount () {
    let { division, week, season } = this.state;
    this.state.players = window.PLAYERS;
    ScoreStore.addChangeListener(this._onChange);
    MatchStore.addChangeListener(this._onChange);
    if (week >= 0) { 
      MatchActions.updateMatches(division, week, season);
    }
    else {
      ScoreActions.loadRankings(division, season);
    }
  }
  componentWillReceiveProps ({ params: { division, week, season } }) {
    this.setState({
      division,
      week,
      season,
    });
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