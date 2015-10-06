import React from 'react';
import PlayerStore from './../../stores/PlayerStore';
import MatchStore from './../../stores/MatchStore';
import ScoreStore from './../../stores/ScoreStore';
import MatchSection from './Match';
import Rankings from './Rankings';
import MatchActions from './../../actions/MatchActions';


function getStateFromStores(currentRound) {
  currentRound = currentRound || 0;
  var matches = MatchStore.getAll();
  var rounds = [{ id: 0, matches: [0,1] },{ id: 1, matches: [2,3]}];
  return {
    matches,
    rounds,
    currentRound,
    match: MatchStore.getFirst(),
    players: PlayerStore.getAll(),
    scores: ScoreStore.getAll(),
    settings: MatchStore.getSettings(),
  };
}



export default class HomeIndex extends React.Component {
  constructor () {
      super();

      this._onChange = () => {
        this.setState(getStateFromStores());
      };
      this._radioChange = event => {
        MatchActions.scoringTypeChanged(event.target.value);
      }

      this._roundChange = event => {
        this.setState(getStateFromStores(event.target.value));
      }

      this.state = getStateFromStores();
      // console.log('current state of affairs: ', this.state);
  }
  render () {
    var { matches, scores, players, rounds, currentRound } = this.state;
    var scoringTypeInputs = [{
      val: 'official',
      print: 'official'
    },
    {
      val: 'partial',
      print: 'full partial'
    },
    {
      val: 'classic',
      print: 'classic'
    }].map( scoringType => (
      <label key={scoringType.val}>
        <input type="radio" 
          name="scoringType" 
          value={scoringType.val} 
          checked={scoringType.val === this.state.settings.scoringType}
          onChange={this._radioChange} 
        />{scoringType.print}
      </label>
    ));
    var roundTab = this.state.rounds.map( (round, round_index) => (
      <label key={round.id}>
        <input type="radio" 
          name="roundIndex" 
          value={round.id} 
          onChange={this._roundChange} 
        />Round {round.id + 1}
      </label>
    ));
    var roundMatches = rounds[currentRound].matches.map( matchId => matches[matchId] );
    return (
    <div className="container">
      <section>
        <div className="input-group">
          {scoringTypeInputs}
        </div>
        <div className="input-group">
          {roundTab}
        </div>
      </section>
      <MatchSection matches={roundMatches} players={players} scores={scores}/>
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