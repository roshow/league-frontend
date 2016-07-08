import React from 'react';
import WingRankerUtils from './../../utils/WingRankerUtils';
import Subnav from './../Subnav/Subnav';
import Matches from './Match';

export default class RankingsSection extends React.Component {
	constructor () {
		super();
	}

	render () {
		return (
			<section>
				<Subnav {...this.props} />
				<Matches players={this.props.players} matches={this.props.matches} />
			</section>
		);
	}

}
