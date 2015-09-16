import AppDispatcher from './../dispatcher/AppDispatcher';
// var TodoConstants = require('../constants/TodoConstants');

function create (text) {
	AppDispatcher.dispatch({
	  // actionType: TodoConstants.TODO_CREATE,
	  actionType: 'TODO_CREATE',
	  text: text
	});
}

export default { create };