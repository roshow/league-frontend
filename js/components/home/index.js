import React from 'react';
import MatchStore from './../../stores/MatchStore';
import ScoreStore from './../../stores/ScoreStore';
import MatchSection from './Match';
import Rankings from './Rankings';

function getStateFromStores() {
  return {
    match: MatchStore.getFirst(),
    players: MatchStore.getPlayers(),
    scores: ScoreStore.getAll(),
  };
}
export default class HomeIndex extends React.Component {
  constructor () {
      super();

      this._onChange = () => {
        this.setState(getStateFromStores());
      }; 

      this.state = getStateFromStores();
      // console.log('current state of affairs: ', this.state);
  }
  render () {
    var { match, scores, players } = this.state;
    return (
    <div>
      <MatchSection match={match} players={players} />
      <Rankings match={match}/>
    </div>
    )
  }

  componentDidMount () {
    MatchStore.addChangeListener(this._onChange);
    ScoreStore.addChangeListener(this._onChange);
  }

  componentWillUnmount () {
    MatchStore.removeChangeListener(this._onChange);   
    ScoreStore.removeChangeListener(this._onChange);  
  }
}