import React from 'react';import { Link } from 'react-router';
import Matches from './../home/Match';



export default class SinglePlayerSection extends React.Component {
	constructor () {
		super();
	}

	render () {
		const { player, players } = this.props;
		console.log(player);
		const seasonsEls = !player.seasons ? '' : Object.keys(player.seasons).reverse().map( season => {
			const playerSeason = player.seasons[season];
			return (
				<section key={`singlePlayersSeasons.${season}`}>
					<h4>Season {season}</h4>
					<h5>Division: {playerSeason.division}</h5>
					<h5>Matches:</h5>
					<Matches matches={playerSeason.matches} players={players} />
				</section>
			);
		});
		return (
			<div className="container">
				<h3>{ player.print_name }</h3>
				{seasonsEls}
			</div>
		);
	}
}