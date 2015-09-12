import React from 'react';
import ToDoStore from './../stores/ToDoStore' 
import MainSection from './MainSection'

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
		return <div>
			<h2>Boring ToDo App</h2>
        <MainSection
          allTodos={this.state.allTodos}
          areAllComplete={this.state.areAllComplete}
        />
		</div>
	}
	componentDidMount () {
		[ 'buy milk','foo bar', 'get it from uptown funk' ].map((text) => ToDoStore.create(text));
		this.setState(getTodoState());
		console.log('component mounted');     
	}
	componentWillUnmount () {
		console.log('component about to unmount');     
	}
}