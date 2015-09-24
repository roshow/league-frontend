import React from 'react';
import MatchesStore from './../../stores/MatchesStore';
import MatchInput from './MatchInput';

function getStateFromStores() {
  return {
    match: MatchesStore.getFirst()
  };
}

export default class HomeIndex extends React.Component {
  constructor () {
      super();
      this.state = getStateFromStores();
      // console.log('current state of affairs: ', this.state);
  }
  render () {
    var match = this.state.match;
    return (
    <div>
      <MatchInput
        match={this.state.match}
      />
    </div>)
  }
  componentDidMount () {
    // this.setState({n:8});
    // console.log('I mounted');
  }
  handleClick () {
      // this.setState({ n: this.state.n + 1 });
  }
}