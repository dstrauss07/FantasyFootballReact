import React from 'react';
import CheatSheetPlayer from './CheatSheetPlayer/CheatSheetPlayer'

const CheatSheetPlayers = (props) => {

    const inheritedPlayers = props.playersToRank;
    let allPlayers = [];
    let playerToAdd;
    let playerCount;
    let selectedPlayers = props.selectedPlayers;
    let selected = false;

    
    console.log(props.filtered);

    if(props.playerPositionFilter === "ALL")
    {
        playerCount = inheritedPlayers.length;
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
     
  if(selectedPlayers != null)
  {
    for (var i = 0; i < inheritedPlayers.length; i++) {
        if (selectedPlayers.includes(inheritedPlayers[i]) )
        {
            selected = true;
        }
        else
        {
            selected = false;
        }
        if (props.playerScoringType === "standard") {
            playerToAdd = 
                <CheatSheetPlayer
                    key ={inheritedPlayers[i].playerToRank.playerId}
                    currentPlayer = {inheritedPlayers[i]}
                    scoringType = {props.playerScoringType}
                    positionFilter = {props.playerPositionFilter}
                    playerCount = {playerCount}
                    selected = {selected}
                    clicked = {props.clicked}
                    filtered = {props.filtered}
                />
        
        }
        if (props.playerScoringType === "ppr") {
            playerToAdd =  <CheatSheetPlayer
                    key={inheritedPlayers[i].playerToRank.playerId}
                    currentPlayer = {inheritedPlayers[i]}
                    scoringType = {props.playerScoringType}
                    positionFilter = {props.playerPositionFilter}
                    playerCount = {playerCount}
                    selected = {selected}
                    clicked = {props.clicked}
                    filtered = {props.filtered}
                />
        }
        if (props.playerScoringType === "dynasty") {
            playerToAdd = <CheatSheetPlayer
                    key ={inheritedPlayers[i].playerToRank.playerId}
                    currentPlayer = {inheritedPlayers[i]}
                    scoringType = {props.playerScoringType}
                    positionFilter = {props.playerPositionFilter}
                    playerCount = {playerCount}
                    selected = {selected}
                    clicked = {props.clicked}
                    filtered = {props.filtered}
                />
        }
        if (inheritedPlayers[i].playerToRank.playerPos === props.playerPositionFilter || props.playerPositionFilter === "ALL") {
            allPlayers.push(playerToAdd);
        }
    }
  }

       allPlayers.sort((a, b) =>
           a.props.playerRank - b.props.playerRank);
           return allPlayers;       
}

export default CheatSheetPlayers;