import AppDispatcher from './../dispatcher/AppDispatcher';
import EventEmitter from 'events';

const CHANGE_EVENT = 'change';

var _thought = {
  status: 'thinking'
};

function updateThought (thought) {
  _thought = thought;
}

function getThought () {
	return _thought;
}


var ThoughtStore = Object.assign({}, EventEmitter.prototype, {

	getThought,
	
	updateThought,

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

AppDispatcher.register((action) => {
  var text;

  switch(action.actionType) {
    case 'THINKING_NEWTHOUGHT':
      updateThought(action.thought);
      ThoughtStore.emitChange();
      break;
  }

});

export default ThoughtStore;