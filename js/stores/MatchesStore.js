var players = [{
	"name": "han",
	"ships": [
		{
			"damage_cap": 13,
			"points": 57
		},
		{
			"damage_cap": 5,
			"points": 42 
		}
	]
},
{
	"name": "bossk",
	"ships": [
		{
			"damage_cap": 8,
			"points": 26
		},
		{
			"damage_cap": 8,
			"points": 26
		},
		{
			"damage_cap": 12,
			"points": 48
		}
	]
}];

var matches = [{
	"player_one": {
		"id": 0,
		"name": "han",
		"damage_taken": [0, 0]
	},
	"player_two": {
		"id": 1,
		"name": "bossk",
		"damage_taken": [0, 0, 0]
	}
}];




// function match_points (match) {
// 	let matchpoints = match.map(function ({id, damage_taken}) {
// 		let ships = players_mockdata[id].ships
// 		let points = ships
// 			.map(({damage_cap, points}, i) => Math.floor(damage_taken[i] * (points/damage_cap)))
// 			.reduce((a, b) => a + b)
// 		if (points === ships.reduce(({points: a}, {points: b}) => a + b)) {
// 			return 100;
// 		}
// 		return points;
// 	});
// 	[matchpoints[1], matchpoints[0]] = [matchpoints[0], matchpoints[1]];
// 	return matchpoints;
// }

export default {
	getFirst () {
		return matches[0];
	}
}