import React from 'react';
import MatchStore from './../../stores/MatchStore';



export default class MatchSection extends React.Component {
	constructor () {
		super();
	}

	render () {
    const { players } = this.props;
    const matchScores = MatchStore.getMatches().map( match => (
      <ul className="list-group" key={match.match_id}>
        {
          match.players.map( ({ name, destroyed }) => {
            let player = players[name];
            let _style = {};
            if (match.winner === name) {
              _style.fontWeight = 'bold';
            }
            return ( <li className="list-group-item" key={name} style={_style}><span>{player.print_name}</span><span className="pull-right">{destroyed}</span></li> );
          })
        }
      </ul>
    ));

    return (<div>{matchScores}</div>);
  }
}