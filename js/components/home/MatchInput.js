import React from 'react';

export default class MatchInput extends React.Component {
  constructor () {
      super();
      this._onChange = this._onChange.bind(this);
      this.onSave = this.onSave.bind(this);

      this.state = { value: 0 };
  }

  render () {
    var _styles = {
      width: '25px'
    };

    return (
    <input
      style={_styles}
      value={this.state.value}
      onChange={this._onChange}
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
  _onChange (event) {
    var val = event.target.value.trim() || 0;
    var num = parseInt(val, 10);
    var maxValue = this.props.maxValue;
    num = isNaN(num) ? 0 : num;
    num = num > maxValue ? maxValue : num;
    this.setState({
      value: num
    });
  }
  onSave () {
    this.props.onSave(this.state.value, this.props.playerIndex, this.props.shipIndex);
  }

}