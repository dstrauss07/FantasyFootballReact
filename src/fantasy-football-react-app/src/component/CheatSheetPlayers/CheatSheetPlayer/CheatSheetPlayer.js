import React from 'react';
import Classes from './CheatSheetPlayer.module.css';

const CheatSheetPlayer = (props) => {
    let playerClass,
    selectedClass,
    filteredClass, 
    posRankDiv;


    switch (props.currentPlayer.playerToRank.playerPos) {
        case 'QB':
            playerClass = Classes.qbPlayer;
            break;
        case 'RB':
            playerClass = Classes.rbPlayer;
            break;
        case 'WR':
            playerClass = Classes.wrPlayer;
            break;
        case 'TE':
            playerClass = Classes.tePlayer;
            break;
        case 'DST':
            playerClass = Classes.dstPlayer;
            break;
        case 'K':
            playerClass = Classes.kPlayer;
            break;
        default:
            playerClass = Classes.qbPlayer;
    }

    if (props.selected) {
        selectedClass = Classes.selected
    }
    else {
        selectedClass = Classes.notSelected
    }

    if (props.filtered){
        filteredClass = Classes.filtered
    }
    else{
        filteredClass = Classes.notFiltered
    }

    switch(props.scoringType)
    {
        case "standard":
            posRankDiv = props.currentPlayer.playerRanking.posRank;
            break;
                case "ppr":
                        posRankDiv = props.currentPlayer.playerRanking.pprPosRank;
                        break;
                case "dynasty":
                        posRankDiv = props.currentPlayer.playerRanking.dynastyPosRank;
    }

    if (props.selected) {
        return (
            <div className={Classes.playerContainer}>
                <div
                    className={Classes.playerDiv}>
                    <div className={[playerClass, selectedClass, filteredClass, Classes.playerName].join(' ')}>x{props.currentPlayer.playerToRank.playerName}</div>
                    <div className={[playerClass, selectedClass, filteredClass, Classes.playerPos].join(' ')}>{props.currentPlayer.playerToRank.playerTeam} </div>
                    <div className={[playerClass, selectedClass, filteredClass, Classes.playerPos].join(' ')}>{props.currentPlayer.playerToRank.playerPos} {posRankDiv}</div>
                </div>
            </div>

        );
    }
    else {
   if(props.buttonDisabled)
   {
    return(
        <div className={Classes.playerContainer}>
            <div className={Classes.playerDiv}>
                <div className={[playerClass, selectedClass, Classes.playerName].join(' ')}>{props.currentPlayer.playerToRank.playerName}</div>
                <div className={[playerClass, selectedClass, Classes.playerPos].join(' ')}>{props.currentPlayer.playerToRank.playerTeam}</div>
                <div className={[playerClass, selectedClass, Classes.playerPos].join(' ')}>{props.currentPlayer.playerToRank.playerPos} {posRankDiv}</div>
            </div>
        </div>
        );
   }
   else
   {
    return(
        <div className={Classes.playerContainer}>
            <div
                onClick={() => { props.clicked(props.currentPlayer) }}
                className={Classes.playerDiv}>
                <div className={[playerClass, selectedClass, Classes.playerName].join(' ')}>{props.currentPlayer.playerToRank.playerName}</div>
                <div className={[playerClass, selectedClass, Classes.playerPos].join(' ')}>{props.currentPlayer.playerToRank.playerTeam}</div>
                <div className={[playerClass, selectedClass, Classes.playerPos].join(' ')}>{props.currentPlayer.playerToRank.playerPos} {posRankDiv}</div>
            </div>
        </div>
        );
   }

    }




}

export default CheatSheetPlayer;