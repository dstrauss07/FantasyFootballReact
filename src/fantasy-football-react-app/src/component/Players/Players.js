import React from 'react';
import Player from './Player/Player'

const players = (props) => {

    console.log(props);

    const inheritedPlayers = props.playersToRank;
    let allPlayers = [];
    let playerToAdd;
    let playerCount;

    

    if(props.playerPositionFilter === "ALL")
    {
        if(props.playersToRank){
            playerCount = props.playersToRank.length;
        }
        else{
            playerCount = 0;
        }

    }

    else
    {
        var counter = 0;
        inheritedPlayers.forEach(function (player){
            if (player.playerToRank.playerPos === props.playerPositionFilter)
            {
                counter++;
            }
        })
        playerCount = counter;
    }

  
    for (var i = 0; i < inheritedPlayers.length; i++) {
        if (props.playerScoringType === "standard") {
            playerToAdd = 
                <Player
                    key ={inheritedPlayers[i].playerToRank.playerId}
                    playerId ={inheritedPlayers[i].playerToRank.playerId}
                    playerName={inheritedPlayers[i].playerToRank.playerName}
                    playerPos={inheritedPlayers[i].playerToRank.playerPos}
                    playerRank={inheritedPlayers[i].playerRanking.playerRank}
                    playerPosRank={inheritedPlayers[i].playerRanking.posRank}
                    scoringType = {props.playerScoringType}
                    positionFilter = {props.playerPositionFilter}
                    playerCount = {playerCount}
                    movePlayerClicked = {props.movePlayerClicked}
                    playerTop = {props.playerTop}
                    playerBottom = {props.playerBottom}
                />
        
        }
        if (props.playerScoringType === "ppr") {
            playerToAdd =  <Player
                    key={inheritedPlayers[i].playerToRank.playerId}
                    playerId ={inheritedPlayers[i].playerToRank.playerId}
                    playerName={inheritedPlayers[i].playerToRank.playerName}
                    playerPos={inheritedPlayers[i].playerToRank.playerPos}
                    playerRank={inheritedPlayers[i].playerRanking.pprRank}
                    playerPosRank={inheritedPlayers[i].playerRanking.pprPosRank}
                    scoringType = {props.playerScoringType}
                    positionFilter = {props.playerPositionFilter}
                    playerCount = {playerCount}
                    movePlayerClicked = {props.movePlayerClicked}
                    playerTop = {props.playerTop}
                    playerBottom = {props.playerBottom}
                />
        }
        if (props.playerScoringType === "dynasty") {
            playerToAdd = <Player
                    key ={inheritedPlayers[i].playerToRank.playerId}
                    playerId ={inheritedPlayers[i].playerToRank.playerId}
                    playerName={inheritedPlayers[i].playerToRank.playerName}
                    playerPos={inheritedPlayers[i].playerToRank.playerPos}
                    playerRank={inheritedPlayers[i].playerRanking.dynastyRank}
                    playerPosRank={inheritedPlayers[i].playerRanking.dynastyPosRank}
                    scoringType = {props.playerScoringType}
                    positionFilter = {props.playerPositionFilter}
                    playerCount = {playerCount}
                    movePlayerClicked = {props.movePlayerClicked}
                    playerTop = {props.playerTop}
                    playerBottom = {props.playerBottom}
                />
        }
        if (inheritedPlayers[i].playerToRank.playerPos === props.playerPositionFilter || props.playerPositionFilter === "ALL") {
            allPlayers.push(playerToAdd);
        }
    }

    //console.log(allPlayers);

       allPlayers.sort((a, b) =>
           a.props.playerRank - b.props.playerRank);

           return allPlayers;
        

}

export default players;