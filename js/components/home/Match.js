import React from 'react';



export default class MatchSection extends React.Component {
	constructor () {
		super();
	}

	render () {
    let matches = this.props.matches;

    var matchesHtml = matches.map( match => (
      <ul className="list-group" key={match.match_id}>
        { match.players.map( player  => (
          <li className="list-group-item" key={player.name} >
            <strong>{player.name}{ player.lp > 2 ? (<sup>*</sup>) : (<span></span>) }</strong> | destroyed: {player.destroyed}
          </li>
        ))}
    </ul>
    ))

    return (
    <div>
      {matchesHtml}
    </div>
    );
  }
}