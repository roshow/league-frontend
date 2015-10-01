import React from 'react';
import PlayerStore from './../../stores/PlayerStore';
import MatchStore from './../../stores/MatchStore';
import ScoreStore from './../../stores/ScoreStore';
import MatchSection from './Match';
import Rankings from './Rankings';


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
    <div className="container">
      <section>
        <div className="input-group">
          <label><input type="radio" name="scoringType" value="official" onChange={this._radioChange.bind(this)} />official</label>
          <label><input type="radio" name="scoringType" value="partial" onChange={this._radioChange.bind(this)} />full partial</label>
          <label><input type="radio" name="scoringType" value="classic" onChange={this._radioChange.bind(this)} />classic</label>
        </div>
      </section>
      <MatchSection match={match} players={players} />
      <Rankings scores={scores} players={players} />
    </div>
    )
  }

  _radioChange (event) {
    console.log(event.target.value);
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