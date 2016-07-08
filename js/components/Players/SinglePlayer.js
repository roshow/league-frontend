import React from 'react';import { Link } from 'react-router';
import Matches from './../home/Match';



export default class SinglePlayerSection extends React.Component {
	constructor () {
		super();
	}

	render () {
		const { player, players } = this.props;
		const seasonsEls = !player.seasons ? '' : Object.keys(player.seasons).reverse().map( season => {
			const playerSeason = player.seasons[season];
			return (
				<section key={`singlePlayersSeasons.${season}`}>
					<h3><span className="label label-default">Season {season}</span></h3>
					<h4>Division: <span style={{textTransform:'capitalize'}} className="label label-default">{playerSeason.division}</span></h4>
					<h4 >Matches:</h4>
					<Matches matches={playerSeason.matches} players={players} />
				</section>
			);
		});
		return (
			<div className="container">
				<h2>{ player.print_name }</h2>
				{seasonsEls}
			</div>
		);
	}
}