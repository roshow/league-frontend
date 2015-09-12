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

export default { create, getAll, areAllComplete };