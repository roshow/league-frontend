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
          match.players.map( ({ name, destroyed, list_link }) => {
            let player = players[name];
            let _style = {};
            let list = '';
            if (match.played) {
              if (match.winner === name) {
                _style.fontWeight = 'bold';
              }
              list = list_link === '' ? ( 'List Missing' ) : ( <a href={list_link}>List</a> );
              list = <span style={{fontWeight:'normal'}}>({list})</span>
            }
            return (
              <li className="list-group-item" key={name} style={_style}>
                <span>{player.print_name} {list}</span>
                <span className="pull-right">{destroyed}</span>
              </li>
            );
          })
        }
      </ul>
    ));

    return (<div>{matchScores}</div>);
  }
}