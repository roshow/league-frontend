import React from 'react';
import PlayerStore from './../../stores/PlayerStore';
import ScoreStore from './../../stores/ScoreStore';
import ScoreActions from './../../actions/ScoreActions';
import Rankings from './Rankings';


function getStateFromStores(currentRound) {
  currentRound = currentRound || 0;
  var rounds = [{ id: 0, matches: [0,1] },{ id: 1, matches: [2,3]}];
  return {
    rankings: ScoreStore.getRankings(),
  };
}



export default class HomeIndex extends React.Component {
  constructor ({ params: { division } }) {
      super();

      this.DIVISION = division;

      this._onChange = () => {
        this.setState(getStateFromStores());
      };

      this.state = getStateFromStores();
      // console.log('current state of affairs: ', this.state);
  }
  render () {
    let { rankings } = this.state;
    let divisions = ['ultima', 'argent'];
    let divEls = divisions.map( div => {
      let classes = ( div === this.DIVISION ) ? "active" : "";
      return <li className={classes} key={div}><a href={`/division/${div}`}>{div.toUpperCase()}</a></li>
    });
    return (
      <div className="container">
        <div>
          <img src="/images/nycxleague_banner_750.jpg" />
        </div>
        <ul className="nav nav-tabs">
          {divEls}
        </ul>
        <Rankings rankings={rankings} />
      </div>
    )
  }

  componentDidMount () {
    ScoreStore.addChangeListener(this._onChange);
    ScoreActions.getRankings(this.DIVISION);
  }

  componentWillUnmount () {
    ScoreStore.removeChangeListener(this._onChange);  
  }
}