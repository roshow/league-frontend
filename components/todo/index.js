import React from 'react';
import ToDoStore from './../stores/ToDoStore'
import MainSection from './MainSection'
import TodoTextInput from './TodoTextInput'

function getTodoState() {
  return {
    allTodos: ToDoStore.getAll(),
    areAllComplete: ToDoStore.areAllComplete()
  };
}

export default class ToDoIndex extends React.Component {
	constructor () {
		super();
		this.state = getTodoState();
	}
	render () {
		return (
		<div>
			

			<header id="header">
	      <h2>Boring ToDo App</h2>
	      <TodoTextInput
	        id="new-todo"
	        placeholder="What needs to be done?"
					onSave={this._onSave.bind(this)}
				/>
	    </header>
      <MainSection
        allTodos={this.state.allTodos}
        areAllComplete={this.state.areAllComplete}
      />
		</div>
		);
	}
	_onSave (text) {
    if (text.trim()){
      ToDoStore.create(text);
      this.setState(getTodoState()); 
    }
  }
	componentDidMount () {
		//Create some dummy initial tasks...
		[ 'buy milk','foo bar', 'get it from uptown funk' ].map((text) => ToDoStore.create(text));
		this.setState(getTodoState()); 
	}
	componentWillUnmount () {
		console.log('component about to unmount');     
	}
}