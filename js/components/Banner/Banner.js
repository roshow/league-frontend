import React from 'react';

export default class Banner extends React.Component {
	constructor () {
		super();
	}

	render () {
		const imgUrl =`/images/nycxleague_banner_${this.props.season || 1}.jpg`;
		const titleStyle = {
			fontFamily: 'Impact, Charcoal, sans-serif',
			marginTop: '10px',
		};
		return (
			<div className="container">
					<h3 style={titleStyle}>NYC X-WING LEAGUE</h3>
          <img className="header-image" src={imgUrl} />
       </div>
		)
	}
}