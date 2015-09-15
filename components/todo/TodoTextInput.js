import React from 'react';

export default class TodoTextInput extends React.Component {
	
	constructor () {
		super();
		this.state = {
			value: ''
		};
	}

	render () {
		var value = this.state.value;
		return (
      <input
      	id={this.props.id}
      	placeholder={this.props.placeholder}
      	type="text"
      	value={this.state.value}
        onChange={this._onChange.bind(this)}
        onBlur={this._save.bind(this)}
        onKeyDown={this._onKeyDown.bind(this)}
      />
    );
	}

	_onKeyDown (event) {
		var enter_key = 13;
		if (event.keyCode === enter_key) {
      this._save();
    }
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