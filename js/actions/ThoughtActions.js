import AppDispatcher from './../dispatcher/AppDispatcher';
import ThoughtUtils from './../utils/ThoughtUtils';

function dispatchThought (thought={status:'thinking'}) {
	AppDispatcher.dispatch({
	  actionType: 'THINKING_NEWTHOUGHT',
	  thought: thought
	});
}

function showRandomThought() {
    ThoughtUtils.getJson().then(function (response) {
    	var thought = response.docs[0];
    	ThoughtUtils.preloadImg(thought.img.src).then(function () {
    		thought.status = 'thought';
    		dispatchThought(thought);
    	});
    });
    dispatchThought();
}

export default { showRandomThought };