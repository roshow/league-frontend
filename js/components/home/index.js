import React from 'react';
import MatchesStore from './../../stores/MatchesStore';
import MatchSection from './Match';
import Rankings from './Rankings';

function getStateFromStores() {
  return {
    match: MatchesStore.getFirst(),
    players: MatchesStore.getPlayers(),
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
    return (
    <div>
      <MatchSection match={this.state.match} />
      <Rankings match={this.state.match} players={this.state.players} />
    </div>
    )
  }

  componentDidMount () {
    MatchesStore.addChangeListener(this._onChange);
  }

  componentWillUnmount () {
    MatchesStore.removeChangeListener(this._onChange);     
  }
}