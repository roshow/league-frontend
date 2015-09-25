import React from 'react';

export default class MatchInput extends React.Component {
  constructor () {
      super();
      this.onChange = this.onChange.bind(this);
      this.onSave = this.onSave.bind(this);

      this.state = { value: 0 };
  }
  render () {
    return (
    <input
      value={this.state.value}
      onChange={this.onChange}
      onBlur={this.onSave}
    />
    );
  }
  componentWillMount () {
    this.setState({
      value: this.props.damage
    });
  }
  componentWillReceiveProps (nextProps) {
    this.setState({
      value: nextProps.damage
    });
  }
  onChange (event) {
    var val = event.target.value.trim() || 0;
    var num = parseInt(val, 10);
    num = isNaN(num) ? 0 : num;
    this.setState({
      value: num
    });
  }
  onSave () {
    this.props.onSave(this.state.value, this.props.playerIndex, this.props.shipIndex);
  }

}