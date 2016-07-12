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
          match.players.map( ({ name, destroyed, list_link }) => {
            const player = players[name];
            const printname = player ? player.print_name : name;
            let _style = {};
            let list = '';
            let listContent = '';
            if (match.gamePlayed) {
              console.log(match.played);
              if (match.winner === name) {
                _style.fontWeight = 'bold';
                
              }
              if (match.gamePlayed === 2) {
                listContent = (match.winner === name) ? 'bye' : 'forfeit';
              }
              else {
                listContent = list_link === '' ? ( 'List Missing' ) : ( <a href={list_link}>List</a> );
              }
              list = <span style={{fontWeight:'normal'}}>({listContent})</span>
            }
            return (
              <li className="list-group-item" key={name} style={_style}>
                <span>{printname} {list}</span>
                <span className="pull-right">{destroyed}</span>
              </li>
            );
          })
        }
      </ul>
    ));

    return (<div className="container matches-container">{matchScores}</div>);
  }
}