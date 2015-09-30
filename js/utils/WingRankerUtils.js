function calcMatchPoints (match, players) {
  let matchpoints = match.players.map(function ({id, damage_taken}) {
    let ships = players[id].ships;
    let points = ships.map(({damage_cap, points}, i) => {
        var pointsEarned = Math.floor(damage_taken[i] * (points/damage_cap));
        return pointsEarned > points ? points : pointsEarned;
      })
      .reduce((a, b) => a + b);

    return (points === ships.reduce(({points: a}, {points: b}) => a + b)) ? 100 : points;
    
  });

  [matchpoints[1], matchpoints[0]] = [matchpoints[0], matchpoints[1]];
  return matchpoints;
}

function addPlayerMatchScores (matches) {
  // console.log(Object.keys(matches));
  // Object.keys(matches).reduce( (totals, key) => {
  //   totals.tournament_points += matches[key].tournament_points;
  //   totals.mov += matches[key].mov;
  //   return totals;
  // }, {
  //   tournament_points: 0,
  //   mov: 0,
  // });
  return {
    tournament_points: 0,
    mov: 0,
  };
}

export default { calcMatchPoints, addPlayerMatchScores };