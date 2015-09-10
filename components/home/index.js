import React from 'react';
import * as players from './../services/playersCollection';

export default class HomeIndex extends React.Component {
  constructor () {
      super();
      console.log('constructor');
      // console.log('players: ', players.get())
      this.state = { n: 0 };
      console.log('current state of affairs: ', this.state);
  }
  componentDidMount () {
    this.setState({n:69});
    console.log('I mounted');
  }
  render () {
    return <div>
      <h1>clicked {this.state.n} times</h1>
      <button onClick={this.handleClick.bind(this)}>click me!</button>
    </div>
  }
  setState (state) {
      // console.log(this.props)
      // console.log('players: ', players.get());
      // console.log('current state of affairs: ', state);
      super.setState(state);
  }
  handleClick () {
      this.setState({ n: this.state.n + 1 });
  }
}