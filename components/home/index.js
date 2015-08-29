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
      puppy: 'a lover'
    })
    this.yourpuppy = 'a fighterrr'
  }
}

var littleFoo = new Foo({
  puppy: 'scrappy'
});

var littleFooFighter = new FooFighter()


export default class HomeIndex extends React.Component {
  constructor () {
    super()
    this.state = { n: this.props.n || 0 }
  }
  render () {
    return <div>
      <h3>Your puppy is: {littleFooFighter.getpuppyStatus()}</h3>
      <h1>clicked {this.state.n} times</h1>
      <button onClick={this.handleClick.bind(this)}>click me!</button>
    </div>
  }
  setState (state) {
    console.log('current state of affairs: ', state)
    super.setState(state)
  }
  handleClick () {
    this.setState({ n: this.state.n + 1 })
  }
}