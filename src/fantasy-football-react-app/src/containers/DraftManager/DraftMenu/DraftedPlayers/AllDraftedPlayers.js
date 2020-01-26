import React from 'react';
import Aux from '../../../../hoc/ReactAux';
import Classes from './AllDraftedPlayers.module.css';
// import { numberLiteralTypeAnnotation } from '@babel/types';
// import ReactDOM from 'react-dom';

const AllDraftedPlayers = (props) => {
    
    let draftSession = props.draftSession,
    leagueSize = props.leagueSettings.leagueSize,
    currentPick = props.draftSession.currentPick,
    lastTenPlayersDrafted = [],
    teamDraftedNumber = 1,
    evenRound,
    lastTenDrafted = draftSession.selectedPlayers.slice(-10),
    draftRound,
    roundPickCalc,
    allPlayerDiv,
    allTeams= draftSession.allTeams,
    pickCalc = currentPick - lastTenDrafted.length;


    if (currentPick === 1) {
        allPlayerDiv = React.createElement(
            'ul', {
            className: Classes.allPlayersList
        },
            React.createElement('li', { id: 'li1' }, 'No Players Selected Yet'))
        
    }

    else{ 
    if(props.draftType==="snake")
    {
  
    for(let i =0; i< lastTenDrafted.length; i++)
    {
        roundPickCalc = pickCalc % leagueSize;
        draftRound = parseInt(pickCalc / leagueSize);


        if (roundPickCalc === 0) {
            roundPickCalc = leagueSize;
            draftRound--;
        }

        if(roundPickCalc === 1 && draftRound>0)  
        {
            evenRound = !evenRound;
        }

        if(evenRound)
        {
            teamDraftedNumber = leagueSize - roundPickCalc + 1
        }

        else
        {
            teamDraftedNumber = roundPickCalc;
        }
        let p = <li>{draftRound+1} . {roundPickCalc} <span>({pickCalc} )</span> {lastTenDrafted[i].playerToRank.playerName} / {lastTenDrafted[i].playerToRank.playerPos} by Team # {teamDraftedNumber}</li>
        lastTenPlayersDrafted.push(p);      
        pickCalc++;
    }
        allPlayerDiv = React.createElement(
            'ul', {
            className: Classes.allPlayersList
        },
            React.createElement('li', { id: 'li1' }, lastTenPlayersDrafted))
 
   }
    else{
        for(let i =0; i< lastTenDrafted.length; i++){
            let playerDraftedName = lastTenDrafted[i].playerToRank.playerName;
            let teamSelected;        
            for(let j = 0; j< allTeams.length; j++){
                let draftedPlayersByTeam = allTeams[j].draftedPlayer;
                console.log(draftedPlayersByTeam);
                if(draftedPlayersByTeam.some(element => element.playerToRank.playerName === playerDraftedName)){
                    teamSelected = allTeams[j].name;
                }
            }
            let p = <li><span>({pickCalc} )</span> {playerDraftedName} / {lastTenDrafted[i].playerToRank.playerPos} / by {teamSelected}/ $ {lastTenDrafted[i].winningBid}</li>
            lastTenPlayersDrafted.push(p);      
            pickCalc++;  
        }
        allPlayerDiv = React.createElement(
            'ul', {
            className: Classes.allPlayersList
        },
            React.createElement('li', { id: 'li1' }, lastTenPlayersDrafted))

    }
}

    return (
        <Aux>
            <div>
                {allPlayerDiv}
            </div>

        </Aux>
    )


}


export default AllDraftedPlayers;