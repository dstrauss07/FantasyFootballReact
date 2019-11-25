import React from 'react';
import Aux from '../../../hoc/Aux';
// import Classes from './MyDraftedPlayers.module.css';
// import { numberLiteralTypeAnnotation } from '@babel/types';
// import ReactDOM from 'react-dom';

const MyDraftedPlayers = (props) => {


    let draftedPlayers;
    if (props.draftSession != null) {
        draftedPlayers = props.draftSession.selectedPlayers
    };

    let teamSlotShown = props.teamShown -1;

    let playerTypes = {
        qbPlayers: [],
        rbPlayers: [],
        wrPlayers: [],
        tePlayers: [],
        dstPlayers: [],
        kPlayers: []
    }
    let leagueSize = props.leagueSettings.leagueSize

    let allTeams = [
        {
            name: 'unknown',
            draftedPlayers: []
        }
    ]

    for (let i = 0; i < leagueSize; i++) {
        let playNum = i + 1;
        allTeams[i] =
            {
                name: 'player' + playNum, draftedPlayer: []
            }
    }


    for (let i = 0; i < draftedPlayers.length; i++) {
        let iIncrement = parseInt(i / leagueSize);
        iIncrement = Math.floor(iIncrement);
        if (iIncrement % 2 === 0) {
            allTeams[
                i - (iIncrement * leagueSize)
            ].draftedPlayer.push(draftedPlayers[i])
        }
        else {
            allTeams[
                leagueSize - (i - (iIncrement * leagueSize) + 1)
            ].draftedPlayer.push(draftedPlayers[i])
        }
    }



    if (allTeams[teamSlotShown].draftedPlayer.length > 0) {
        for (let i = 0; i < allTeams[teamSlotShown].draftedPlayer.length; i++) {
            switch (allTeams[teamSlotShown].draftedPlayer[i].playerToRank.playerPos){ 
                case "QB":
                    playerTypes.qbPlayers.push(allTeams[teamSlotShown].draftedPlayer[i]);
                    break;
                case "RB":
                    playerTypes.rbPlayers.push(allTeams[teamSlotShown].draftedPlayer[i]);
                    break;
                case "WR":
                    playerTypes.wrPlayers.push(allTeams[teamSlotShown].draftedPlayer[i]);
                    break;
                case "TE":
                    playerTypes.tePlayers.push(allTeams[teamSlotShown].draftedPlayer[i]);
                    break;
                case "DST":
                    playerTypes.dstPlayers.push(allTeams[teamSlotShown].draftedPlayer[i]);
                    break;
                case "K":
                    playerTypes.kPlayers.push(allTeams[teamSlotShown].draftedPlayer[i]);
                    break;
                default:
                    break;
            }
        }
    }

    let qbDiv, rbDiv, wrDiv, teDiv, dstDiv, kDiv, revertDiv;

    if (playerTypes.qbPlayers.length === 0) {
        qbDiv = <div>none selected</div>
    }
    else {
        qbDiv = playerTypes.qbPlayers.map(qbplayer => <div>{qbplayer.playerToRank.playerName}</div>)
    }

    if (playerTypes.rbPlayers.length === 0) {
        rbDiv = <div>none selected</div>
    }
    else {
        rbDiv = playerTypes.rbPlayers.map(rbplayer => <div>{rbplayer.playerToRank.playerName}</div>)
    }

    if (playerTypes.wrPlayers.length === 0) {
        wrDiv = <div>none selected</div>
    }
    else {
        wrDiv = playerTypes.wrPlayers.map(wrplayer => <div>{wrplayer.playerToRank.playerName}</div>)
    }

    if (playerTypes.tePlayers.length === 0) {
        teDiv = <div>none selected</div>
    }
    else {
        teDiv = playerTypes.tePlayers.map(teplayer => <div>{teplayer.playerToRank.playerName}</div>)
    }

    if (playerTypes.dstPlayers.length === 0) {
        dstDiv = <div>none selected</div>
    }
    else {
        dstDiv = playerTypes.dstPlayers.map(dstplayer => <div>{dstplayer.playerToRank.playerName}</div>)
    }

    if (playerTypes.kPlayers.length === 0) {
        kDiv = <div>none selected</div>
    }
    else {
        kDiv = playerTypes.kPlayers.map(kplayer => <div>{kplayer.playerToRank.playerName}</div>)
    }

    if (props.draftSession.selectedPlayers.length > 0) {
        revertDiv = <div><button
            onClick={props.revertPick}>Revert Pick</button></div>
    }
    else {
        revertDiv = <div></div>
    }


    let CreateSelectItems =() => {
        let teamTogglerOptions = [];         
        for (let i=1; i<=props.leagueSettings.leagueSize; i++) {             
            teamTogglerOptions.push(<option key={i} value={i}>Team {i}</option>);   
        }
        return teamTogglerOptions;
    }  
   

    



    return (
        <Aux>
            {}
            {revertDiv}
            <form>
            <div>
            <select onChange={props.onDropdownSelected}>
            {CreateSelectItems()}
            </select>
            </div>
            </form>
            <h3>QBs</h3>
            {qbDiv}
            <h3>RBs</h3>
            {rbDiv}
            <h3>WRs</h3>
            {wrDiv}
            <h3>TEs</h3>
            {teDiv}
            <h3>DST</h3>
            {dstDiv}
            <h3>K</h3>
            {kDiv}
            <div>{props.leagueSettings.leagueType}</div>
        </Aux>

    )
}
export default MyDraftedPlayers;