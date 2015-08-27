import React from 'react'

class Foo {
  constructor (stati) {
    this.yourpuppy = stati.puppy || 'meh'
  }
  getpuppyStatus () {
    return this.yourpuppy
  }
}

class FooFighter extends Foo {
  constructor () {
    super({
      puppy: 'whateverz'
    })
    this.yourpuppy = 'ugly'
  }
}

var littleFoo = new Foo({
  puppy: 'smelly'
});

var littleFooFighter = new FooFighter()


export default class App extends React.Component {
  constructor () {
    super()
    this.state = { n: 0 }
  }
  render () {
    return <div>
      <h3>Your puppy is: {littleFooFighter.getpuppyStatus()}</h3>
      <h3>Echo: {this.props.echo || 'echo'}</h3>
      <h1>clicked {this.state.n} times</h1>
      <button onClick={this.handleClick.bind(this)}>click me!</button>
    </div>
  }
  handleClick () {
    this.setState({ n: this.state.n + 1 })
  }
}