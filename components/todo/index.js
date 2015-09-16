import React from 'react';
import ToDoStore from './../../stores/ToDoStore';
import AppDispatcher from './../../dispatcher/AppDispatcher';
import TodoActions from './../../actions/TodoActions';
import MainSection from './MainSection';
import TodoTextInput from './TodoTextInput';

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
		text = text.trim();
		if (text){
		  // ToDoStore.create(text);
		  // this.setState(getTodoState()); 
		  TodoActions.create(text);
		}
	}
	componentDidMount () {
		//Create some dummy initial tasks...
		[ 'buy milk','foo bar', 'get it from uptown funk' ].map((text) => ToDoStore.create(text));
		var that = this;
		AppDispatcher.register((action) => {
		  var text = action.text;

		  switch(action.actionType) {
		    case 'TODO_CREATE':
		      if (text !== '') {
		        ToDoStore.create(text);
		        this.setState(getTodoState());
		        // TodoStore.emitChange();
		      }
		      break;
		  }
		});

		this.setState(getTodoState()); 
	}
	componentWillUnmount () {
		console.log('component about to unmount');     
	}
}