import React from 'react';
import * as players from './../../services/playersCollection';

export default class HomeIndex extends React.Component {
  constructor () {
      super();
      this.state = { n: 0 };
      // console.log('current state of affairs: ', this.state);
  }
  render () {
    return <div>
      <h1>clicked {this.state.n} times</h1>
      <button onClick={this.handleClick.bind(this)}>click me!</button>
    </div>
  }
  componentDidMount () {
    this.setState({n:8});
    console.log('I mounted');
  }
  handleClick () {
      this.setState({ n: this.state.n + 1 });
  }
}