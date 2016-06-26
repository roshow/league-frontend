import React from 'react';

export default class Banner extends React.Component {
	constructor () {
		super();
	}

	render () {
		const season = this.props.season;
		let imgUrl;
		switch (season) {
			case 2:
			case "2":
				imgUrl = "/images/nycxleague_banner_2_750.jpg";
				break;
			default:
				imgUrl = "/images/nycxleague_banner_750.jpg";
				break;
		}
		return (
			<div className="container">
          <img className="header-image" src={imgUrl} />
       </div>
		)
	}
}