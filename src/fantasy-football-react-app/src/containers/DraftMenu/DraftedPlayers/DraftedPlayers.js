import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Aux from '../../../hoc/Aux';
import Classes from './DraftedPlayers.module.css';
import { numberLiteralTypeAnnotation } from '@babel/types';

const DraftedPlayers = (props) => {


    let draftedPlayers;
    if(props.draftSession != null)
    {
        draftedPlayers = props.draftSession.selectedPlayers
    };


    let playerTypes={
        qbPlayers:[],
        rbPlayers:[],
        wrPlayers:[],
        tePlayers:[],
        dstPlayers:[],
        kPlayers:[]
    }

    const myDraftPos = props.leagueSettings.draftSlot;
    let leagueSize= props.leagueSettings.leagueSize
    
    let allTeams = [
        {
            name: 'unknown',
            draftedPlayers: []
        }
    ]

    for(let i=0; i<leagueSize; i++)
    {
        let playNum = i +1;
        allTeams[i] = 
        {
            name: 'player' + playNum, draftedPlayer:[]
        }
    }


    for(let i=0;i<draftedPlayers.length;i++)
    {
        let iIncrement = parseInt(i/leagueSize);
        iIncrement = Math.floor(iIncrement);
        console.log(iIncrement);
        if(iIncrement%2 == 0)
        {            
            allTeams[
            i - (iIncrement*leagueSize)     
            ].draftedPlayer.push(draftedPlayers[i])
            console.log("even");
            console.log(allTeams);
        }
        else 
        {
            console.log(iIncrement/leagueSize);
            allTeams[
            leagueSize- (i - (iIncrement*leagueSize)+1)
           ].draftedPlayer.push(draftedPlayers[i])
            console.log("odd")
            console.log(allTeams);
        }
    }


    if (draftedPlayers != null) {
        for (let i = 0; i < draftedPlayers.length; i++) {
            switch (draftedPlayers[i].playerToRank.playerPos) {
                case "QB":
                    playerTypes.qbPlayers.push(draftedPlayers[i]);
                    break;
                case "RB":
                    playerTypes.rbPlayers.push(draftedPlayers[i]);
                    break;
                case "WR":
                    playerTypes.wrPlayers.push(draftedPlayers[i]);
                    break;
                case "TE":
                    playerTypes.tePlayers.push(draftedPlayers[i]);
                    break;
                case "DST":
                    playerTypes.dstPlayers.push(draftedPlayers[i]);
                    break;
                case "K":
                    playerTypes.kPlayers.push(draftedPlayers[i]);
                    break;
                default:
                    break;
            }
        }
    }

    let qbDiv,rbDiv,wrDiv,teDiv,dstDiv,kDiv, revertDiv;

    if(playerTypes.qbPlayers.length == 0)
    {
        qbDiv = <div>none selected</div>
    }
    else
    {
        qbDiv = playerTypes.qbPlayers.map(qbplayer => <div>{qbplayer.playerToRank.playerName}</div>)
    }

    if(playerTypes.rbPlayers.length == 0)
    {
        rbDiv = <div>none selected</div>
    }
    else
    {
        rbDiv = playerTypes.rbPlayers.map(rbplayer => <div>{rbplayer.playerToRank.playerName}</div>)
    }

    if(playerTypes.wrPlayers.length == 0)
    {
        wrDiv = <div>none selected</div>
    }
    else
    {
        wrDiv = playerTypes.wrPlayers.map(wrplayer => <div>{wrplayer.playerToRank.playerName}</div>)
    }

    if(playerTypes.tePlayers.length == 0)
    {
        teDiv = <div>none selected</div>
    }
    else
    {
        teDiv = playerTypes.tePlayers.map(teplayer => <div>{teplayer.playerToRank.playerName}</div>)
    }

    if(playerTypes.dstPlayers.length == 0)
    {
        dstDiv = <div>none selected</div>
    }
    else
    {
        dstDiv = playerTypes.dstPlayers.map(dstplayer => <div>{dstplayer.playerToRank.playerName}</div>)
    }

    if(playerTypes.kPlayers.length == 0)
    {
        kDiv = <div>none selected</div>
    }
    else
    {
        kDiv = playerTypes.kPlayers.map(kplayer => <div>{kplayer.playerToRank.playerName}</div>)
    }
   
    if(props.draftSession.selectedPlayers.length > 0)
    {
       revertDiv= <div><button 
       onClick={props.revertPick}>Revert Pick</button></div>
    }
    else
    {
        revertDiv = <div></div>
    }

    return (
        <Aux>
            {revertDiv}
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
export default DraftedPlayers;