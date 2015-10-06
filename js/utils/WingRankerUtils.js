function calcMatchPoints (match, players, scoringType='official') {
  var matchpoints = match.players.map(function ({id, damage_taken}) {
    var ships = players[id].ships;
    var points = ships.map(({damage_cap, points, large_base}, i) => {
        var pointsEarned;
        var theDamage = damage_taken[i];

        // if damage dealt is greater than or equal to the damage the ship can take, then you get all points, under every scoring system.
        if (theDamage >= damage_cap) {
          return points;
        }

        switch (scoringType) {
          
          case 'partial':
            pointsEarned = Math.floor(theDamage * (points/damage_cap));
            break;
          
          case 'classic':
            pointsEarned = 0;
            break;
          
          case 'official':
            pointsEarned = (large_base && theDamage >= Math.floor(damage_cap/2)) ? Math.floor(points/2) : 0;
            break;
        
        }

        return pointsEarned;

      })
      .reduce((a, b) => a + b);

    return (points === ships.reduce(({points: a}, {points: b}) => a + b)) ? 100 : points;
    
  });

  [matchpoints[1], matchpoints[0]] = [matchpoints[0], matchpoints[1]];
  return matchpoints;
}

var calcMov = matchPoints => matchPoints.reduce( (a, b) => {
  var diff = (a >= b) ? (a - b) : (b - a) * -1;
  return [100 + diff, 100 - diff];
});


// This is horrible and needs to be refactored
var calcTPts_oneway = (player, opponent) => ( player > opponent ) ? ( player === 100 || ( player > opponent + 12 ) ? 5 : 3 ) : ( player === opponent ) ? 1 : 0;
function calcTournamentPoints (matchPoints) {
  return [calcTPts_oneway(...matchPoints), calcTPts_oneway(matchPoints[1], matchPoints[0])];
}

function rankScores (scores) {
  return scores.concat().sort(function ({ overall: aOverall},  { overall: bOverall}) {
    if ( 
      aOverall.tournament_points > bOverall.tournament_points ||
      aOverall.mov >= bOverall.mov 
    ) {
      return -1;
    }
    return 1;
  });
}

export default { calcMatchPoints, calcMov, calcTournamentPoints, rankScores };