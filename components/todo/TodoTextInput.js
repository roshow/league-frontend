import React from 'react';

export default class TodoTextInput extends React.Component {
	
	constructor () {
		super();
		this.state = {
			value: 'a thing'
		};
	}

	render () {
		var value = this.state.value;
		return (
      <input
      	type="text"
        onChange={this._onChange.bind(this)}
        onBlur={this._save.bind(this)}
        value={this.state.value}
      />
    );
	}

	_onChange (event) {
    this.setState({
      value: event.target.value
    });
  }

  _save () {
  	this.props.onSave(this.state.value)
  	this.setState({
  		value: ''
  	});
  }

}