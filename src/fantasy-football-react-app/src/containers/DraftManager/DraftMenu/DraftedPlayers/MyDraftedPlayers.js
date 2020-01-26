import React from 'react';
import Aux from '../../../../hoc/ReactAux';
import Classes from './MyDraftedPlayers.module.css';
// import { numberLiteralTypeAnnotation } from '@babel/types';
// import ReactDOM from 'react-dom';

const MyDraftedPlayers = (props) => {

    let teamSlotShown = props.teamShown - 1;
    let playerTypes = {
        qbPlayers: [],
        rbPlayers: [],
        wrPlayers: [],
        tePlayers: [],
        dstPlayers: [],
        kPlayers: []
    }
    let allTeams;
    let remainingBudget = <div></div>;
    if (props.draftSession.currentPick > 1) {
        allTeams = props.draftSession.allTeams;

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
    }

    let qbDiv, rbDiv, wrDiv, teDiv, dstDiv, kDiv, revertDiv;

    if (playerTypes.qbPlayers.length === 0) {
        qbDiv = <div className={Classes.posDiv}>none selected</div>
    }
    else {
        if (props.draftType === "snake") {
            switch (props.leagueSettings.leagueType) {
                case "standard":
                    qbDiv = playerTypes.qbPlayers.map(qbplayer => <div className={Classes.posDiv}>{qbplayer.playerToRank.playerName} -  QB {qbplayer.playerRanking.posRank}</div>);
                    break;
                case "ppr":
                    qbDiv = playerTypes.qbPlayers.map(qbplayer => <div className={Classes.posDiv}>{qbplayer.playerToRank.playerName} -  QB {qbplayer.playerRanking.pprPosRank}</div>)
                    break;
                case "dynasty":
                    qbDiv = playerTypes.qbPlayers.map(qbplayer => <div className={Classes.posDiv}>{qbplayer.indexOf}{qbplayer.playerToRank.playerName} -  QB {qbplayer.playerRanking.dynastyPosRank} </div>)
                    break;
                default:
                    qbDiv = playerTypes.qbPlayers.map(qbplayer => <div className={Classes.posDiv}>{qbplayer.playerToRank.playerName} -  QB {qbplayer.playerRanking.posRank}</div>)
            }
        }
        else {
            switch (props.leagueSettings.leagueType) {
                case "standard":
                    qbDiv = playerTypes.qbPlayers.map(qbplayer => <div className={Classes.posDiv}>{qbplayer.playerToRank.playerName} -  QB {qbplayer.playerRanking.posRank}- $ {qbplayer.winningBid}</div>);
                    break;
                case "ppr":
                    qbDiv = playerTypes.qbPlayers.map(qbplayer => <div className={Classes.posDiv}>{qbplayer.playerToRank.playerName} -  QB {qbplayer.playerRanking.pprPosRank} - $ {qbplayer.winningBid}</div>)
                    break;
                case "dynasty":
                    qbDiv = playerTypes.qbPlayers.map(qbplayer => <div className={Classes.posDiv}>{qbplayer.indexOf}{qbplayer.playerToRank.playerName} -  QB {qbplayer.playerRanking.dynastyPosRank} - $ {qbplayer.winningBid} </div>)
                    break;
                default:
                    qbDiv = playerTypes.qbPlayers.map(qbplayer => <div className={Classes.posDiv}>{qbplayer.playerToRank.playerName} -  QB {qbplayer.playerRanking.posRank} - $ {qbplayer.winningBid}</div>)
            }
        }

    }

    if (playerTypes.rbPlayers.length === 0) {
        rbDiv = <div className={Classes.posDiv}>none selected</div>
    }
    else {
        if (props.draftType === "snake") {
            switch (props.leagueSettings.leagueType) {
                case "standard":
                    rbDiv = playerTypes.rbPlayers.map(rbPlayer => <div className={Classes.posDiv}>{rbPlayer.playerToRank.playerName} -  RB {rbPlayer.playerRanking.posRank}</div>)
                    break;
                case "ppr":
                    rbDiv = playerTypes.rbPlayers.map(rbPlayer => <div className={Classes.posDiv}>{rbPlayer.playerToRank.playerName} -  RB {rbPlayer.playerRanking.pprPosRank}</div>)
                    break;
                case "dynasty":
                    rbDiv = playerTypes.rbPlayers.map(rbPlayer => <div className={Classes.posDiv}>{rbPlayer.playerToRank.playerName} -  RB {rbPlayer.playerRanking.dynastyPosRank}</div>)
                    break;
                default:
                    rbDiv = playerTypes.rbPlayers.map(rbPlayer => <div className={Classes.posDiv}>{rbPlayer.playerToRank.playerName} -  RB {rbPlayer.playerRanking.posRank}</div>)
            }
        }
        else {
            switch (props.leagueSettings.leagueType) {
                case "standard":
                    rbDiv = playerTypes.rbPlayers.map(rbPlayer => <div className={Classes.posDiv}>{rbPlayer.playerToRank.playerName} -  RB {rbPlayer.playerRanking.posRank} - $ {rbPlayer.winningBid}</div>)
                    break;
                case "ppr":
                    rbDiv = playerTypes.rbPlayers.map(rbPlayer => <div className={Classes.posDiv}>{rbPlayer.playerToRank.playerName} -  RB {rbPlayer.playerRanking.pprPosRank} - $ {rbPlayer.winningBid}</div>)
                    break;
                case "dynasty":
                    rbDiv = playerTypes.rbPlayers.map(rbPlayer => <div className={Classes.posDiv}>{rbPlayer.playerToRank.playerName} -  RB {rbPlayer.playerRanking.dynastyPosRank} - $ {rbPlayer.winningBid}</div>)
                    break;
                default:
                    rbDiv = playerTypes.rbPlayers.map(rbPlayer => <div className={Classes.posDiv}>{rbPlayer.playerToRank.playerName} -  RB {rbPlayer.playerRanking.posRank} - $ {rbPlayer.winningBid}</div>)
            }
        }
    }

    if (playerTypes.wrPlayers.length === 0) {
        wrDiv = <div className={Classes.posDiv}>none selected</div>
    }
    else {
        if (props.draftType === "snake") {
            switch (props.leagueSettings.leagueType) {
                case "standard":
                    wrDiv = playerTypes.wrPlayers.map(wrPlayer => <div className={Classes.posDiv}>{wrPlayer.playerToRank.playerName} -  WR {wrPlayer.playerRanking.posRank}</div>)
                    break;
                case "ppr":
                    wrDiv = playerTypes.wrPlayers.map(wrPlayer => <div className={Classes.posDiv}>{wrPlayer.playerToRank.playerName} -  WR {wrPlayer.playerRanking.pprPosRank}</div>)
                    break;
                case "dynasty":
                    wrDiv = playerTypes.wrPlayers.map(wrPlayer => <div className={Classes.posDiv}>{wrPlayer.playerToRank.playerName} -  WR {wrPlayer.playerRanking.dynastyPosRank}</div>)
                    break;
                default:
                    wrDiv = playerTypes.wrPlayers.map(wrPlayer => <div className={Classes.posDiv}>{wrPlayer.playerToRank.playerName} -  WR {wrPlayer.playerRanking.posRank}</div>)
            }
        }
        else {
            switch (props.leagueSettings.leagueType) {
                case "standard":
                    wrDiv = playerTypes.wrPlayers.map(wrPlayer => <div className={Classes.posDiv}>{wrPlayer.playerToRank.playerName} -  WR {wrPlayer.playerRanking.posRank} - $ {wrPlayer.winningBid}</div>)
                    break;
                case "ppr":
                    wrDiv = playerTypes.wrPlayers.map(wrPlayer => <div className={Classes.posDiv}>{wrPlayer.playerToRank.playerName} -  WR {wrPlayer.playerRanking.pprPosRank} - $ {wrPlayer.winningBid}</div>)
                    break;
                case "dynasty":
                    wrDiv = playerTypes.wrPlayers.map(wrPlayer => <div className={Classes.posDiv}>{wrPlayer.playerToRank.playerName} -  WR {wrPlayer.playerRanking.dynastyPosRank} - $ {wrPlayer.winningBid}</div>)
                    break;
                default:
                    wrDiv = playerTypes.wrPlayers.map(wrPlayer => <div className={Classes.posDiv}>{wrPlayer.playerToRank.playerName} -  WR {wrPlayer.playerRanking.posRank} - $ {wrPlayer.winningBid}</div>)
            }
        }
    }

    if (playerTypes.tePlayers.length === 0) {
        teDiv = <div className={Classes.posDiv}>none selected</div>
    }
    else {
        if (props.draftType === "snake") {
        switch (props.leagueSettings.leagueType) {
            case "standard":
                teDiv = playerTypes.tePlayers.map(tePlayer => <div className={Classes.posDiv}>{tePlayer.playerToRank.playerName} -  TE {tePlayer.playerRanking.posRank}</div>)
                break;
            case "ppr":
                teDiv = playerTypes.tePlayers.map(tePlayer => <div className={Classes.posDiv}>{tePlayer.playerToRank.playerName} -  TE {tePlayer.playerRanking.pprPosRank}</div>)
                break;
            case "dynasty":
                teDiv = playerTypes.tePlayers.map(tePlayer => <div className={Classes.posDiv}>{tePlayer.playerToRank.playerName} -  TE {tePlayer.playerRanking.dynastyPosRank}</div>)
                break;
            default:
                teDiv = playerTypes.tePlayers.map(tePlayer => <div className={Classes.posDiv}>{tePlayer.playerToRank.playerName} -  TE {tePlayer.playerRanking.posRank}</div>)
        }
    }
    else{
        switch (props.leagueSettings.leagueType) {
            case "standard":
                teDiv = playerTypes.tePlayers.map(tePlayer => <div className={Classes.posDiv}>{tePlayer.playerToRank.playerName} -  TE {tePlayer.playerRanking.posRank} - ${tePlayer.winningBid}</div>)
                break;
            case "ppr":
                teDiv = playerTypes.tePlayers.map(tePlayer => <div className={Classes.posDiv}>{tePlayer.playerToRank.playerName} -  TE {tePlayer.playerRanking.pprPosRank} - ${tePlayer.winningBid}</div>)
                break;
            case "dynasty":
                teDiv = playerTypes.tePlayers.map(tePlayer => <div className={Classes.posDiv}>{tePlayer.playerToRank.playerName} -  TE {tePlayer.playerRanking.dynastyPosRank} - ${tePlayer.winningBid}</div>)
                break;
            default:
                teDiv = playerTypes.tePlayers.map(tePlayer => <div className={Classes.posDiv}>{tePlayer.playerToRank.playerName} -  TE {tePlayer.playerRanking.posRank} - ${tePlayer.winningBid}</div>)
    }
}
    }

    if (playerTypes.dstPlayers.length === 0) {
        dstDiv = <div className={Classes.posDiv}>none selected</div>
    }
    else {
        if (props.draftType === "snake") {
        switch (props.leagueSettings.leagueType) {
            case "standard":
                dstDiv = playerTypes.dstPlayers.map(dstPlayer => <div className={Classes.posDiv}>{dstPlayer.playerToRank.playerName} -  DST {dstPlayer.playerRanking.posRank}</div>)
                break;
            case "ppr":
                dstDiv = playerTypes.dstPlayers.map(dstPlayer => <div className={Classes.posDiv}>{dstPlayer.playerToRank.playerName} -  DST {dstPlayer.playerRanking.pprPosRank}</div>)
                break;
            case "dynasty":
                dstDiv = playerTypes.dstPlayers.map(dstPlayer => <div className={Classes.posDiv}>{dstPlayer.playerToRank.playerName} -  DST {dstPlayer.playerRanking.dynastyPosRank}</div>)
                break;
            default:
                dstDiv = playerTypes.dstPlayers.map(dstPlayer => <div className={Classes.posDiv}>{dstPlayer.playerToRank.playerName} -  DST {dstPlayer.playerRanking.posRank}</div>)
        }
    }
    else{
        switch (props.leagueSettings.leagueType) {
            case "standard":
                dstDiv = playerTypes.dstPlayers.map(dstPlayer => <div className={Classes.posDiv}>{dstPlayer.playerToRank.playerName} -  DST {dstPlayer.playerRanking.posRank} - ${dstPlayer.winningBid}</div>)
                break;
            case "ppr":
                dstDiv = playerTypes.dstPlayers.map(dstPlayer => <div className={Classes.posDiv}>{dstPlayer.playerToRank.playerName} -  DST {dstPlayer.playerRanking.pprPosRank} - ${dstPlayer.winningBid}</div>)
                break;
            case "dynasty":
                dstDiv = playerTypes.dstPlayers.map(dstPlayer => <div className={Classes.posDiv}>{dstPlayer.playerToRank.playerName} -  DST {dstPlayer.playerRanking.dynastyPosRank} - ${dstPlayer.winningBid}</div>)
                break;
            default:
                dstDiv = playerTypes.dstPlayers.map(dstPlayer => <div className={Classes.posDiv}>{dstPlayer.playerToRank.playerName} -  DST {dstPlayer.playerRanking.posRank} - ${dstPlayer.winningBid}</div>)
        }
    }
    }

    if (playerTypes.kPlayers.length === 0) {
        kDiv = <div className={Classes.posDiv}>none selected</div>
    }
    else {
        if (props.draftType === "snake") {
        switch (props.leagueSettings.leagueType) {
            case "standard":
                kDiv = playerTypes.kPlayers.map(kPlayer => <div className={Classes.posDiv}>{kPlayer.playerToRank.playerName} -  K {kPlayer.playerRanking.posRank}</div>)
                break;
            case "ppr":
                kDiv = playerTypes.kPlayers.map(kPlayer => <div className={Classes.posDiv}>{kPlayer.playerToRank.playerName} -  K {kPlayer.playerRanking.pprPosRank}</div>)
                break;
            case "dynasty":
                kDiv = playerTypes.kPlayers.map(kPlayer => <div className={Classes.posDiv}>{kPlayer.playerToRank.playerName} -  K {kPlayer.playerRanking.dynastyPosRank}</div>)
                break;
            default:
                kDiv = playerTypes.kPlayers.map(kPlayer => <div className={Classes.posDiv}>{kPlayer.playerToRank.playerName} -  K {kPlayer.playerRanking.posRank}</div>)
        }
    }
    else{
        switch (props.leagueSettings.leagueType) {
            case "standard":
                kDiv = playerTypes.kPlayers.map(kPlayer => <div className={Classes.posDiv}>{kPlayer.playerToRank.playerName} -  K {kPlayer.playerRanking.posRank} - ${kPlayer.winningBid}</div>)
                break;
            case "ppr":
                kDiv = playerTypes.kPlayers.map(kPlayer => <div className={Classes.posDiv}>{kPlayer.playerToRank.playerName} -  K {kPlayer.playerRanking.pprPosRank} - ${kPlayer.winningBid}</div>)
                break;
            case "dynasty":
                kDiv = playerTypes.kPlayers.map(kPlayer => <div className={Classes.posDiv}>{kPlayer.playerToRank.playerName} -  K {kPlayer.playerRanking.dynastyPosRank} - ${kPlayer.winningBid}</div>)
                break;
            default:
                kDiv = playerTypes.kPlayers.map(kPlayer => <div className={Classes.posDiv}>{kPlayer.playerToRank.playerName} -  K {kPlayer.playerRanking.posRank} - ${kPlayer.winningBid}</div>)
        }
    }
    }

    let CreateSelectItems = () => {
        let teamTogglerOptions = [];
        for (let i = 1; i <= props.leagueSettings.leagueSize; i++) {
            if (i === parseInt(props.teamShown)) {
                if (i === parseInt(props.leagueSettings.draftSlot)) {
                    teamTogglerOptions.push(<option className={Classes.yourTeam} selected="selected" key={i} value={i}>Your Team</option>);
                }
                else {

                    teamTogglerOptions.push(<option className={Classes.otherTeam} selected="selected" key={i} value={i}>Team {i}</option>);
                }
            }
            else {
                if (i === parseInt(props.leagueSettings.draftSlot)) {
                    teamTogglerOptions.push(<option className={Classes.yourTeam} key={i} value={i}>Your Team</option>);
                }
                else {
                    teamTogglerOptions.push(<option className={Classes.otherTeam} key={i} value={i}>Team {i}</option>);
                }

            }
        }
        return teamTogglerOptions;
    }

    if (props.draftType === "auction" && !props.confirmMode) {
        if (props.draftSession.currentPick > 1) {
            remainingBudget = <div>${props.draftSession.allTeams[props.teamShown - 1].budgetRemaining} of ${props.leagueSettings.startingBudget} </div>
        }
        else {
            remainingBudget = <div>${props.leagueSettings.startingBudget} of ${props.leagueSettings.startingBudget}  </div>
        }
    }

    return (
        <Aux>
            <div>
                <div className={Classes.controlArea}>
                    {revertDiv}
                    <div>
                        <select defaultValue={teamSlotShown + 1} value={teamSlotShown + 1} onChange={props.onDropdownSelected}>
                            {CreateSelectItems()}
                        </select>
                    </div>

                    {remainingBudget}
                    <div />
                </div>

                <div className={Classes.playerArea}>
                    <div>
                        <h3 className={Classes.posHead}>QBs</h3>
                    </div>
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