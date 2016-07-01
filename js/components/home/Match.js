import React from 'react';



export default class MatchSection extends React.Component {
	constructor () {
		super();
	}

	render () {
    const { matches, players } = this.props;

    let matchScores = matches.map( match => (
      <ul className="list-group" key={match.match_id}>
        {
          match.players.map( function ({ name, destroyed }) {
            let player = players[name];
            let _style = {};
            if (match.winner === name) {
              _style['font-weight'] = 'bold';
            }
            return ( <li className="list-group-item" key={name} style={_style}><span>{player.print_name}</span><span className="pull-right">{destroyed}</span></li> );
          })
        }
      </ul>
    ));

    return (<div>{matchScores}</div>);
  }
}