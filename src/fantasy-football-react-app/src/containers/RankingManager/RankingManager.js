import React, { Component } from 'react';
import Aux from '../../hoc/Aux';

class RankingManager extends Component{

render(){

    return(
        <Aux>
        <p>{this.props.mode}</p>
        <p>{this.props.playersToRank[0].playerToRank.playerName}</p>
        <p>{this.props.playersToRank[0].playerRanking.playerRank}</p>
        <p>{this.props.playersToRank[1].playerToRank.playerName}</p>
        <p>{this.props.playersToRank[1].playerRanking.playerRank}</p>
        <p>{this.props.playersToRank[2].playerToRank.playerName}</p>
        <p>{this.props.playersToRank[2].playerRanking.playerRank}</p>
        </Aux>
    )
}

}

export default RankingManager;