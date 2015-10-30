import AppDispatcher from './../dispatcher/AppDispatcher';
import ThoughtUtils from './../utils/ThoughtUtils';

function dispatchThought (thought={status:'thinking'}) {
	AppDispatcher.dispatch({
	  actionType: 'THINKING_NEWTHOUGHT',
	  thought: thought
	});
}

function showThought (id='?random=true') {
	
    ThoughtUtils.getJson( `${ThoughtUtils.apiUrl}/${id}` ).then( function ({ docs: [ thought ] }) {

    	ThoughtUtils.preloadImg( thought.img.src ).then(function () {

    		thought.status = 'thought';
    		dispatchThought( thought );

    	} );

    } );
    
    dispatchThought();

}

export default { showThought };