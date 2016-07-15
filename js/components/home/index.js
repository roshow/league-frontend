import React from 'react';
import ScoreStore from './../../stores/ScoreStore';
import ScoreActions from './../../actions/ScoreActions';
import PlayerActions from './../../actions/PlayerActions';
import MatchStore from './../../stores/MatchStore';
import MatchActions from './../../actions/MatchActions';
import Banner from './../Banner/Banner';
import PlayerStore from './../Players/PlayerStore';
import Nav from './../Nav/Nav';
import Rankings from './Rankings';
import Matches from './Match';
import WingRankerConstants from './../../constants/WingRankerConstants';
import { Link } from 'react-router';


export default class HomeIndex extends React.Component {
  constructor ({ params: { division, week, season} }) {
      super();
      this._onChange = () => {
        this.setState(this.getState());
      };
      this.state = Object.assign({
        division: division,
        season: parseInt(season, 10),
        week: parseInt(week, 10),
        players: {},
      }, this.getState());
  }

  getState () {
    return {
      rankings: ScoreStore.getRankings(),
      matches: MatchStore.getMatches(),
      player: PlayerStore.getCurrentPlayer(),
      players: PlayerStore.getAll(), 
    };

  }
  render () {
    const { rankings, matches, division, week, players, season } = this.state;
    return (
      <section>
        <Banner season={season}/>
        <Nav {...this.state} />
        <section>
          { React.cloneElement(this.props.children, { ...this.state }) }
        </section>
      </section>
    )
  }

  componentDidMount () {
    const { props: { params: { division, week, season, playername } } } = this;
    ScoreStore.addChangeListener(this._onChange);
    MatchStore.addChangeListener(this._onChange);
    PlayerStore.addChangeListener(this._onChange);
    PlayerActions.getPlayers();
    this.refreshData(division, season, week, playername);
  }
  componentWillReceiveProps ({ params: { division, week, season, playername } }) {
    this.setState({
      division,
      week,
      season,
    });

    this.refreshData(division, season, week, playername);
    
  }

  refreshData (division, season, week, playername) {
    if (playername) {
      PlayerActions.updateCurrentPlayer(playername);
    }
    else if (week >= 0) { 
      MatchActions.updateMatches(division, week, season);
    }
    else if (season) {
      ScoreActions.loadRankings(division, season);
    }
  }
  componentWillUnmount () {
    ScoreStore.removeChangeListener(this._onChange);  
    MatchStore.removeChangeListener(this._onChange);
    PlayerStore.removeChangeListener(this._onChange);
  }
}