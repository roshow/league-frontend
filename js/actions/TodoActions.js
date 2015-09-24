import AppDispatcher from './../dispatcher/AppDispatcher';
import TodoConstants from './../constants/TodoConstants';

function create (text) {
	AppDispatcher.dispatch({
	  actionType: TodoConstants.TODO_CREATE,
	  text: text
	});
}

export default { create };