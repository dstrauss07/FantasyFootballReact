import React from 'react';
import Aux from '../../../hoc/ReactAux';
import Classes from './MyDraftedPlayers.module.css';
import Suggestions from '../Suggestions/Suggestions'
// import { numberLiteralTypeAnnotation } from '@babel/types';
// import ReactDOM from 'react-dom';

const MyDraftedPlayers = (props) => {

    let draftedPlayers;
    if (props.draftSession != null) {
        draftedPlayers = props.draftSession.selectedPlayers
    };

    let teamSlotShown = props.teamShown - 1;

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


    if (draftedPlayers != null) {
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
    }




    if (allTeams[teamSlotShown].draftedPlayer.length > 0) {
        for (let i = 0; i < allTeams[teamSlotShown].draftedPlayer.length; i++) {
            switch (allTeams[teamSlotShown].draftedPlayer[i].playerToRank.playerPos) {
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
        qbDiv = <div className={Classes.posDiv}>none selected</div>
    }
    else {
        qbDiv = playerTypes.qbPlayers.map(qbplayer => <div className={Classes.posDiv}>{qbplayer.playerToRank.playerName}</div>)
    }

    if (playerTypes.rbPlayers.length === 0) {
        rbDiv = <div className={Classes.posDiv}>none selected</div>
    }
    else {
        rbDiv = playerTypes.rbPlayers.map(rbplayer => <div className={Classes.posDiv}>{rbplayer.playerToRank.playerName}</div>)
    }

    if (playerTypes.wrPlayers.length === 0) {
        wrDiv = <div className={Classes.posDiv}>none selected</div>
    }
    else {
        wrDiv = playerTypes.wrPlayers.map(wrplayer => <div className={Classes.posDiv}>{wrplayer.playerToRank.playerName}</div>)
    }

    if (playerTypes.tePlayers.length === 0) {
        teDiv = <div className={Classes.posDiv}>none selected</div>
    }
    else {
        teDiv = playerTypes.tePlayers.map(teplayer => <div className={Classes.posDiv}>{teplayer.playerToRank.playerName}</div>)
    }

    if (playerTypes.dstPlayers.length === 0) {
        dstDiv = <div className={Classes.posDiv}>none selected</div>
    }
    else {
        dstDiv = playerTypes.dstPlayers.map(dstplayer => <div className={Classes.posDiv}>{dstplayer.playerToRank.playerName}</div>)
    }

    if (playerTypes.kPlayers.length === 0) {
        kDiv = <div className={Classes.posDiv}>none selected</div>
    }
    else {
        kDiv = playerTypes.kPlayers.map(kplayer => <div className={Classes.posDiv}>{kplayer.playerToRank.playerName}</div>)
    }

    if (props.draftSession.selectedPlayers != null) {
        revertDiv = <div><button
            onClick={props.revertPick}>Revert Pick</button></div>
    }
    else {
        revertDiv = <div></div>
    }


    let CreateSelectItems = () => {
        let teamTogglerOptions = [];
        for (let i = 1; i <= props.leagueSettings.leagueSize; i++) {
            if(i=== props.teamShown)
            {
                teamTogglerOptions.push(<option selected="selected" key={i} value={i}>Team {i}</option>);
            }
            else{
                teamTogglerOptions.push(<option key={i} value={i}>Team {i}</option>);
            }
        }
        return teamTogglerOptions;
    }






    return (
        <Aux>
            <div>
            <div className={Classes.controlArea}>
                {revertDiv}
                <div>
                    <select defaultValue={teamSlotShown+1} value={teamSlotShown+1} onChange={props.onDropdownSelected}>
                        {CreateSelectItems()}
                    </select>
                </div>
            </div>
            <div className={Classes.playerArea}>
                <h3 className={Classes.posHead}>QBs</h3>
                <div>
                    {qbDiv}
                </div>
            </div>
            <div className={Classes.breakLine} />
            <div className={Classes.playerArea}>
                <h3 className={Classes.posHead}>RBs</h3>
                <div>
                    {rbDiv}
                </div>
            </div>
            <div className={Classes.breakLine} />
            <div className={Classes.playerArea}>
                <h3 className={Classes.posHead}>WRs</h3>
                <div>
                {wrDiv}
                </div>
            </div>
            <div className={Classes.breakLine} />
            <div className={Classes.playerArea}>
                <h3 className={Classes.posHead}>TEs</h3>
                <div>
                    {teDiv}
                </div>
            </div>
            <div className={Classes.breakLine} />
            <div className={Classes.playerArea}>
                <h3 className={Classes.posHead}>DST</h3>
                <div>
                {dstDiv}
                </div>
            </div>
            <div className={Classes.breakLine} />
            <div className={Classes.playerArea}>
                <h3 className={Classes.posHead}>K</h3>
                <div>
                {kDiv} 
                </div>
            </div>
            <div className={Classes.breakLine} />
            </div>
        </Aux>

    )
}
export default MyDraftedPlayers;