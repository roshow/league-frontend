import React from 'react';



export default class MatchSection extends React.Component {
	constructor () {
		super();
	}

	render () {
    let matches = this.props.matches;
    let _tableStyles = {};

    // var matchesHtml = matches.map( match => (
    //   <ul className="list-group" key={match.match_id}>
    //     { match.players.map( player  => (
    //       <li className="list-group-item" key={player.name} >
    //         <strong>{player.name}{ player.lp > 2 ? (<sup>*</sup>) : (<span></span>) }</strong> | destroyed: {player.destroyed}
    //       </li>
    //     ))}
    // </ul>
    // ))

    let matchScores = matches.map( ({ match_id, players }) => (
      <tr key={match_id}>
        <td>{players[0].name}</td>
        <td>{players[0].destroyed}</td>
        <td>{players[1].name}</td>
        <td>{players[1].destroyed}</td>
      </tr>
    ));

    return (
    <table className="table" style={_tableStyles}>
      <thead>
        <tr>
          <th>Player 1</th>
          <th>Destroyed</th>
          <th>Player 2</th>
          <th>Destroyed</th>
        </tr>
      </thead>
      <tbody>
        {matchScores}
      </tbody>
    </table>);
  }
}