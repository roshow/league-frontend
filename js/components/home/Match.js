import React from 'react';



export default class MatchSection extends React.Component {
	constructor () {
		super();
	}

	render () {
    let { matches, players } = this.props;
    let _tableStyles = {};

    let matchScores = matches.map( match => (
          <ul className="list-group" key={match.match_id}>
            {
                match.players.map( ({ name, destroyed }) => (
                    <li className="list-group-item" key={name}><span>{players[name].print_name}</span><span className="pull-right">{destroyed}</span></li>
                ))
            }
          </ul>
    ));

    return (<div>{matchScores}</div>);
    // <table className="table" style={_tableStyles}>
    //   <thead>
    //     <tr>
    //       <th></th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {matchScores}
    //   </tbody>
    // </table>);
  }
}