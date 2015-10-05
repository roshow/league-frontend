import React from 'react';
import PlayerStore from './../../stores/PlayerStore';
import MatchStore from './../../stores/MatchStore';
import ScoreStore from './../../stores/ScoreStore';
import MatchSection from './Match';
import Rankings from './Rankings';
import MatchActions from './../../actions/MatchActions';


function getStateFromStores() {
  return {
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

      this.state = getStateFromStores();
      // console.log('current state of affairs: ', this.state);
  }
  render () {
    var { match, scores, players } = this.state;
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
    return (
    <div className="container">
      <section>
        <div className="input-group">
          {scoringTypeInputs}
        </div>
      </section>
      <MatchSection match={match} players={players} scores={scores}/>
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