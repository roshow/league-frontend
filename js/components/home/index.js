import React from 'react';
import MatchesStore from './../../stores/MatchesStore';
import MatchSection from './Match';

function getStateFromStores() {
  return {
    match: MatchesStore.getFirst()
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