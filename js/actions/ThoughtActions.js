import AppDispatcher from './../dispatcher/AppDispatcher';
import ThoughtUtils from './../utils/ThoughtUtils';

function dispatchThought (thought={status:'thinking'}) {
	AppDispatcher.dispatch({
	  actionType: 'THINKING_NEWTHOUGHT',
	  thought: thought
	});
}

// function showThought (id) {
// 	ThoughtUtils.getJson(`${ThoughtUtils.apiUrl}/${id}`).then(function ( { docs: [ thought ] } ) {
// 		console.log('really. ', thought);
// 	});
// }

function showThought (id) {
		// showThought('542f6d113739d18c0c545a36');
		var url = id ? `${ThoughtUtils.apiUrl}/${id}` : undefined;
    ThoughtUtils.getJson(url).then(function (response) {
    	var thought = response.docs[0];
    	ThoughtUtils.preloadImg(thought.img.src).then(function () {
    		thought.status = 'thought';
    		dispatchThought(thought);
    	});
    });
    dispatchThought();
}

export default { showThought };