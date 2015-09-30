import React from 'react';
import PlayerStore from './../../stores/PlayerStore';
import MatchStore from './../../stores/MatchStore';
import ScoreStore from './../../stores/ScoreStore';
import MatchSection from './Match';
import Rankings from './Rankings';

console.log('playerStore: ', PlayerStore);

function getStateFromStores() {
  return {
    match: MatchStore.getFirst(),
    players: PlayerStore.getAll(),
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
      <Rankings scores={scores} players={players} />
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