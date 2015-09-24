import React from 'react';

function listShips (ships) {
  var listItems =  ships.map( (damage, i) => (
  <li>
    Ship {i + 1}: <input value={damage} />
  </li>
  ));

  return (
  <ul>
    {listItems}
  </ul>
  );
}

export default class MatchInput extends React.Component {
  constructor () {
      super();
  }
  render () {
    var match = this.props.match;
    return (
    <div>
      <div>
        <h3>{match.player_one.name}</h3>
        {listShips(match.player_one.damage_taken)}
      </div>
      <div>
        <h3>{match.player_two.name}</h3>
        {listShips(match.player_two.damage_taken)}
      </div>
    </div>
    );
  }
}