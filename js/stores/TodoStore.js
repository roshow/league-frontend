import AppDispatcher from './../dispatcher/AppDispatcher';
import EventEmitter from 'events';
import TodoConstants from './../constants/TodoConstants';

const CHANGE_EVENT = 'change';

var  _todos = {};

function create (text) {
	var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
	_todos[id] = {
		id: id,
		text: text,
		complete: false
	};
}

function getAll () {
	return _todos;
}

function areAllComplete () {
  for (let id in _todos) {
    if (!_todos[id].complete) {
      return false;
    }
  }
	return true;
}


var TodoStore = Object.assign({}, EventEmitter.prototype, {

	create,
	
	getAll,
	
	areAllComplete,

  emitChange () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

console.log('new generic store');

AppDispatcher.register((action) => {
  var text;

  switch(action.actionType) {
    case TodoConstants.TODO_CREATE:
      text = action.text.trim();
      if (text !== '') {
        create(text);
        TodoStore.emitChange();
      }
      break;
  }
});

export default TodoStore;