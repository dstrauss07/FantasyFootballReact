import React from 'react';
import Classes from './CheatSheetPlayer.module.css';

const CheatSheetPlayer = (props) => {
    let playerClass;
    let selectedClass;

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

    if (props.selected) {
        return (
            <div className={Classes.playerContainer}>
                <div
                    className={Classes.playerDiv}>
                    <div className={[playerClass, selectedClass, Classes.playerName].join(' ')}>{props.currentPlayer.playerToRank.playerName}</div>
                    <div className={[playerClass, selectedClass, Classes.playerPos].join(' ')}>{props.currentPlayer.playerToRank.playerPos} {props.playerPosRank}</div>
                    <div className={[playerClass, selectedClass, Classes.playerRank].join(' ')}>{props.currentPlayer.playerToRank.playerRank}</div>
                </div>
            </div>

        );
    }
    else {
        return(
        <div className={Classes.playerContainer}>
            <div
                onClick={() => { props.clicked(props.currentPlayer) }}
                className={Classes.playerDiv}>
                <div className={[playerClass, selectedClass, Classes.playerName].join(' ')}>{props.currentPlayer.playerToRank.playerName}</div>
                <div className={[playerClass, selectedClass, Classes.playerPos].join(' ')}>{props.currentPlayer.playerToRank.playerPos} {props.playerPosRank}</div>
                <div className={[playerClass, selectedClass, Classes.playerRank].join(' ')}>{props.currentPlayer.playerToRank.playerRank}</div>
            </div>
        </div>
        );
    }


}

export default CheatSheetPlayer;