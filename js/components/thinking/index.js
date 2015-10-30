import React from 'react';
import AppDispatcher from './../../dispatcher/AppDispatcher';
import ThoughtActions from './../../actions/ThoughtActions';
import ThoughtStore from './../../stores/ThoughtStore';

function getState() {
  return {
  	thought: ThoughtStore.getThought()
  };
}


export default class ThinkingIndex extends React.Component {
	
	constructor ({ params: { thoughtId } } ) {
		super();
		this._initThought = thoughtId;
		this.state = getState();
		this._onChange = () => {
			this.setState(getState());
		}; 
	}

	componentDidMount () {
    ThoughtStore.addChangeListener(this._onChange);
    // get first thought after the component mounts
    ThoughtActions.showThought(this._initThought);
  }

  componentWillUnmount () {
    ThoughtStore.removeChangeListener(this._onChange);
  }

	render () {
		var thought = this.state.thought;
		var batSpinner = {
			display: thought.status === 'thinking' ? 'block' : 'none'
		};
		// This is so, so, SO UGLY
		var batStyle = {};
		if (thought.img) {
			batStyle = {
				backgroundImage: 'url(' + thought.img.src + ')',
				backgroundSize: thought.img.scale,
			};
		}
		
		return (
		<div className="container">
			<div className="bat-container">
		   <div id="thought">
		      <div id="bkg" className="bubble0" style={batStyle} onClick={ThoughtActions.showRandomThought}>
		      	<img id="batspinner" src="http://roshow.net/public/images/thinkbatman/spinners/batspinner_2.jpg" style={batSpinner}/>
		      </div>
		   </div>
		   <div id="credits">
		      <p>image: <span><a id="imageCredit" target="_blank">credit name</a></span></p>
		      <p className="siteCredits">site by <a href="http://roshow.net" target="_blank">roshow</a></p>
		      <p className="siteCredits">inspired by <a href="http://roshow.net" target="_blank">calmingmanatee.com</a></p>
		   </div>
			</div>
		</div>
		);
	}
};