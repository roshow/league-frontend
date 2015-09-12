import React from 'react';

export default class MainSection extends React.Component {
	
	render () {
		var allTodos = this.props.allTodos;	
		var todos = Object
			.keys(allTodos)
			.map(function (key) { 
				return <li key={key} >{allTodos[key].text}</li>
			});

		return (
		<section>
			<ul>{todos}</ul>
		</section>
		);	
	}

}