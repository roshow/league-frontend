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

        dispatchThought({
            status: 'thinking',
            _id: thought._id,
        });


    	ThoughtUtils.preloadImg( thought.img.src ).then(function () {

    		thought.status = 'thought';
    		dispatchThought( thought );

    	} );

    } );
    
    dispatchThought({
        status: 'thinking',
        _id: id,
    });

}

export default { showThought };