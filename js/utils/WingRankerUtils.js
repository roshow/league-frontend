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

let veryLocalCache = {};
function setSessionCache (data, ...keyData) { //namedata should be type (match, rankings), division, season[, week]
  let key = keyData.join('.');
  let dataStr =  JSON.stringify(data);

  veryLocalCache[key] = dataStr;
  // sessionStorage.setItem( key, dataStr );
}

function getSessionCache (...keyData) { //namedata should be type (match, rankings), division, season[, week]
  let key = keyData.join('.');
  let dataStr = veryLocalCache[key] || null; 
  // let dataStr = sessionStorage.getItem(key);
  return  JSON.parse(dataStr);
}

export default { calcMatchPoints, setSessionCache, getSessionCache };