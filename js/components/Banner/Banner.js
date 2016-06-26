import React from 'react';

export default class Banner extends React.Component {
	constructor () {
		super();
	}

	render () {
		const season = this.props.season;
		let imgUrl;
		switch (season) {
			default:
				imgUrl = "/images/nycxleague_banner_750.jpg";
				break
		}
		return (
			<div className="container">
          <img className="header-image" src={imgUrl} />
       </div>
		)
	}
}