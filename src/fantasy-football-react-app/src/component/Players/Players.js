import React from 'react';
import Player from './Player/Player'
import player from './Player/Player';

const players = (props) => {

    var allPlayers = [];
  
    for (var i = 0; i < props.playersToRank.length; i++) {
        if (props.playerScoringType === "standard") {
            var playerToAdd = 
                <Player
                    playerName={props.playersToRank[i].playerToRank.playerName}
                    playerPos={props.playersToRank[i].playerToRank.playerPos}
                    playerRank={props.playersToRank[i].playerRanking.playerRank}
                    playerPosRank={props.playersToRank[i].playerRanking.posRank}
                />
        
        }
        if (props.playerScoringType === "ppr") {
            var playerToAdd =  <Player
                    playerName={props.playersToRank[i].playerToRank.playerName}
                    playerPos={props.playersToRank[i].playerToRank.playerPos}
                    playerRank={props.playersToRank[i].playerRanking.pprRank}
                    playerPosRank={props.playersToRank[i].playerRanking.pprPosRank}
                />
        }
        if (props.playerScoringType === "dynasty") {
            var playerToAdd = <Player
                    playerName={props.playersToRank[i].playerToRank.playerName}
                    playerPos={props.playersToRank[i].playerToRank.playerPos}
                    playerRank={props.playersToRank[i].playerRanking.dynastyRank}
                    playerPosRank={props.playersToRank[i].playerRanking.dynastyPosRank}
                />
        }
        if (props.playersToRank[i].playerToRank.playerPos == props.playerPositionFilter || props.playerPositionFilter == "ALL") {
            allPlayers.push(playerToAdd);
        }
    }



       allPlayers.sort((a, b) =>
           a.props.playerRank - b.props.playerRank);

           console.log(allPlayers[0].props.playerName);

        return allPlayers;
         

}

export default players;