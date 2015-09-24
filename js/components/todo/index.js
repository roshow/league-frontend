import React from 'react';
import TodoStore from './../../stores/TodoStore';
import AppDispatcher from './../../dispatcher/AppDispatcher';
import TodoActions from './../../actions/TodoActions';
import MainSection from './MainSection';
import TodoTextInput from './TodoTextInput';

function getTodoState() {
  return {
    allTodos: TodoStore.getAll(),
    areAllComplete: TodoStore.areAllComplete()
  };
}


export default class ToDoIndex extends React.Component {
	
	constructor () {
		super();
		this.state = getTodoState();
		// Have to set _onChange here for now because otherwise passing it into the listener 
		// requires binding it in that call. I'm assuming the arguments for add and remove 
		// emit listeners require the same object be passed not just two functions that work 
		// the same way.
		this._onChange = () => {
			this.setState(getTodoState());
		}; 
	}

	render () {
		return (
		<div>

			<header id="header">
	      
	      <h2>Boring ToDo App</h2>

	    </header>

	    <TodoTextInput
        id="new-todo"
        placeholder="What needs to be done?"
				onSave={this._onSave.bind(this)}
			/>

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
		  TodoActions.create(text);
		}
	}

	componentDidMount () {
		TodoStore.addChangeListener(this._onChange);
		//Create some dummy initial tasks...
		[ 'buy milk','foo bar', 'get it from uptown funk', 'deeez' ].map( text => this._onSave(text) );
	}

	componentWillUnmount () {
		// console.log('component about to unmount');
		TodoStore.removeChangeListener(this._onChange);     
	}

}