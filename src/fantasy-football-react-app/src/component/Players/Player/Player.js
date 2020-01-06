import React from 'react';
import Classes from './Player.module.css'

const player = (props) => {
    var playerClass;
    var upButton;
    var downButton;
    var topButton;
    var bottomButton;
    switch (props.playerPos) {
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


    if (props.positionFilter === "ALL") {
        if (props.playerRank === 1) {
            upButton = Classes.hideButton;
            topButton= Classes.hideButton;
        }
        else if(props.playerRank === 2){
            upButton = Classes.upButton;
            topButton= Classes.hideButton;
        }
        else {
            upButton = Classes.upButton;
            topButton=Classes.topButton;
        }

        if (props.playerRank+1 < props.playerCount) {
            
            downButton = Classes.downButton;
            bottomButton = Classes.bottomButton;
        }
        else if(props.playerRank < props.playerCount)
        {
            downButton = Classes.downButton;
            bottomButton = Classes.hideButton;
        }
        else {
            downButton = Classes.hideButton
            bottomButton = Classes.hideButton;
        }
    }

    else {
        if (props.playerPosRank === 1) {
            upButton = Classes.hideButton;
            topButton= Classes.hideButton;
        }
        else if(props.playerPosRank ===2)
        {
            upButton = Classes.upButton;
            topButton = Classes.hideButton;
        }
        else {
            upButton = Classes.upButton
            topButton = Classes.topButton;
        }
        if (props.playerPosRank+1 < props.playerCount) {
            downButton = Classes.downButton
            bottomButton = Classes.bottomButton;
        }
        else if (props.playerPosRank < props.playerCount)
        {
            downButton = Classes.downButton;
            bottomButton = Classes.hideButton;
        }
        else {
            downButton = Classes.hideButton;
            bottomButton = Classes.hideButton;
        }
    }





    return (
        <div className={Classes.playerContainer}>
            <div className={Classes.playerDiv}>
                <button className={topButton} onClick={()=> props.movePlayerClicked(props.playerId,0,true,false)}>&#x2191; &#x2191;</button>
                <button className={upButton} onClick={() => props.movePlayerClicked(props.playerId, -1,false, false)} >&#x2191;</button>
                <div className={[playerClass,Classes.playerName].join(' ')}>{props.playerName}</div>
                <div className={[playerClass, Classes.playerPos].join(' ')}>{props.playerPos} {props.playerPosRank}</div>
                <div className={[playerClass, Classes.playerRank].join(' ')}>{props.playerRank}</div>
                <button className={downButton} onClick={() => props.movePlayerClicked(props.playerId, 1, false, false)}>&#x2193;</button>
                <button className={bottomButton} onClick={()=> props.movePlayerClicked(props.playerId,0,false,true)}> &#x2193; &#x2193;</button>
            </div>
        </div>
    )
}

export default player;