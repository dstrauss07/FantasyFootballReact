import React from 'react';
import Classes from './Player.module.css'

const player = (props) =>{
    var playerClass;
    var upButton;
    var downButton;
    switch(props.playerPos){
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
            playerClass= Classes.qbPlayer;
    }


    if(props.positionFilter === "ALL")
    {
        if(props.playerRank === 1)
        {
            upButton = Classes.hideButton
        }
        else
        {
            upButton = Classes.upButton
        }

        if(props.playerRank < props.playerCount)
        {
            downButton = Classes.downButton
        }
        else
        {
            downButton = Classes.hideButton
        }
    }

    else
    {
        if(props.playerPosRank === 1)
        {
            upButton = Classes.hideButton
        }
        else
        {
            upButton = Classes.upButton
        }
        if(props.playerPosRank < props.playerCount)
        {
            downButton = Classes.downButton
        }
        else
        {
            downButton = Classes.hideButton
        }
    }





    return(
        <div className={Classes.playerDiv}>
            <div className={playerClass}>{props.playerName}</div>
            <div className={playerClass}>{props.playerPos} {props.playerPosRank}</div>
            <div className={playerClass}>{props.playerRank}</div>
            <button className={upButton} onClick={() => props.movePlayerClicked(props.playerId, -1)} >Move Up</button>
            <button className={downButton} onClick={() => props.movePlayerClicked(props.playerId, 1)}>Move Down</button>
        </div>
    )
}

export default player;