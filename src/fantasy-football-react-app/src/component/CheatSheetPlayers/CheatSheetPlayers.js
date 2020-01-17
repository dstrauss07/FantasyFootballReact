import React from 'react';
import CheatSheetPlayer from './CheatSheetPlayer/CheatSheetPlayer'

const CheatSheetPlayers = (props) => {
    // console.log(props.buttonDisabled);
    const inheritedPlayers = props.playersToRank;
    let allPlayers = [];
    let playerToAdd;
    let playerCount;
    let selectedPlayers = props.selectedPlayers;
    let selected = false;

    if (props.playerPositionFilter === "ALL") {
        playerCount = inheritedPlayers.length;
    }
    else {
        var counter = 0;
        inheritedPlayers.forEach(function (player) {
            if (player.playerToRank.playerPos === props.playerPositionFilter) {
                counter++;
            }
        })
        playerCount = counter;
    }

    if (selectedPlayers != null) {
        for (var i = 0; i < inheritedPlayers.length; i++) {
            if (selectedPlayers.includes(inheritedPlayers[i])) {
                selected = true;
            }
            else {
                selected = false;
            }
            if (props.playerScoringType === "standard") {
                playerToAdd =
                    <CheatSheetPlayer
                        key={inheritedPlayers[i].playerToRank.playerId}
                        currentPlayer={inheritedPlayers[i]}
                        scoringType={props.playerScoringType}
                        positionFilter={props.playerPositionFilter}
                        playerCount={playerCount}
                        selected={selected}
                        clicked={props.clicked}
                        filtered={props.filtered}
                        buttonDisabled={props.buttonDisabled}
                        draftType={props.draftType}
                    />

            }
            if (props.playerScoringType === "ppr") {
                playerToAdd = <CheatSheetPlayer
                    key={inheritedPlayers[i].playerToRank.playerId}
                    currentPlayer={inheritedPlayers[i]}
                    scoringType={props.playerScoringType}
                    positionFilter={props.playerPositionFilter}
                    playerCount={playerCount}
                    selected={selected}
                    clicked={props.clicked}
                    filtered={props.filtered}
                    buttonDisabled={props.buttonDisabled}
                    draftType={props.draftType}
                />
            }
            if (props.playerScoringType === "dynasty") {
                playerToAdd = <CheatSheetPlayer
                    key={inheritedPlayers[i].playerToRank.playerId}
                    currentPlayer={inheritedPlayers[i]}
                    scoringType={props.playerScoringType}
                    positionFilter={props.playerPositionFilter}
                    playerCount={playerCount}
                    selected={selected}
                    clicked={props.clicked}
                    filtered={props.filtered}
                    buttonDisabled={props.buttonDisabled}
                    draftType={props.draftType}
                />
            }
            if (inheritedPlayers[i].playerToRank.playerPos === props.playerPositionFilter || props.playerPositionFilter === "ALL") {
                allPlayers.push(playerToAdd);
            }
        }
    }

    switch (props.playerScoringType) {
        case "standard":
            allPlayers.sort((a, b) =>
                a.props.currentPlayer.playerRanking.playerRank - b.props.currentPlayer.playerRanking.playerRank);
            return allPlayers;
        case "ppr":
            allPlayers.sort((a, b) =>
            a.props.currentPlayer.playerRanking.pprRank - b.props.currentPlayer.playerRanking.pprRank);
            return allPlayers;
        case "dynasty":
            allPlayers.sort((a, b) =>
            a.props.currentPlayer.playerRanking.dynastyRank - b.props.currentPlayer.playerRanking.dynastyRank);
            return allPlayers;
        default:
                allPlayers.sort((a, b) =>
                a.props.currentPlayer.playerRanking.playerRank - b.props.currentPlayer.playerRanking.playerRank);
            return allPlayers;
    }
}

export default CheatSheetPlayers;