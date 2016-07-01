import React from 'react';
import MatchStore from './../../stores/MatchStore';



export default class MatchSection extends React.Component {
	constructor () {
		super();
	}

	render () {
    const { players={}, matches } = this.props;
    const matchScores = ( matches || MatchStore.getMatches() ).map( match => (
      <ul className="list-group" key={match.match_id}>
        {
          match.players.map( ({ name, destroyed }) => {
            const player = players[name];
            const printname = player ? player.print_name : name;
            let _style = {};
            if (match.winner === name) {
              _style.fontWeight = 'bold';
            }
            return ( <li className="list-group-item" key={name} style={_style}><span>{printname}</span><span className="pull-right">{destroyed}</span></li> );
          })
        }
      </ul>
    ));

    return (<div>{matchScores}</div>);
  }
}