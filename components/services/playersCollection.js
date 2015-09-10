import hrm from './messingAround'

hrm()

var i = 0

const players_mockdata = [{
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
	"name": "dash",
	"ships": [
		{
			"damage_cap": 10,
			"points": 58
		},
		{
			"damage_cap": 5,
			"points": 42 
		}
	]
}]

const amatch = [
	{
		"id": 0,
		"damage_taken": [13, 5]
	},
	{
		"id": 1,
		"damage_taken": [10, 4]
	}
]


function match_points (match) {
	let matchpoints = match.map(function ({id, damage_taken}) {
		let ships = players_mockdata[id].ships
		let points = ships
			.map(({damage_cap, points}, i) => Math.floor(damage_taken[i] * (points/damage_cap)))
			.reduce((a, b) => a + b)
		if (points === ships.reduce(({points: a}, {points: b}) => a + b)) {
			return 100;
		}
		return points;
	});
	[matchpoints[1], matchpoints[0]] = [matchpoints[0], matchpoints[1]];
	return matchpoints;
}

// var key = 'ships'
// var [{[key]: playerone},{[key]: playertwo}] = players_mockdata;
// // console.log(playerone, playertwo)

// var {0:zero} = players_mockdata
// // console.log(zero)

console.log(match_points(amatch));



export function get () {
	// console.log(++i)
	return JSON.parse(window.localStorage.getItem('players') || JSON.stringify(players_mockdata));
}
export function save (players) {
	players = players || '[]';
	window.localStorage.setItem('players', JSON.stringify(players));
	return players;
}
