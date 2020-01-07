import React from 'react';
import Aux from '../../../../hoc/ReactAux';
import classes from './AllDraftedPlayers.module.css';
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
        pickCalc,
        roundPickCalc,
        allPlayerDiv;

    if (currentPick === 1) {
        allPlayerDiv = React.createElement(
            'ul', {
            className: classes.allPlayersList
        },
            React.createElement('li', { id: 'li1' }, 'No Players Selected Yet'))
    }
    else {

    pickCalc = currentPick - lastTenDrafted.length;
    roundPickCalc = pickCalc % leagueSize;
    draftRound = parseInt(pickCalc / leagueSize);

    if (roundPickCalc === 0) {
            roundPickCalc = leagueSize;
      }
    
    if(draftRound % 2 === 1)
    {
        evenRound  = false;
    }
    else
    {
        evenRound  = true;
    }
   
    for(let i =0; i< lastTenDrafted.length; i++)
    {
        roundPickCalc = pickCalc % leagueSize;
        if (roundPickCalc === 0) {
            roundPickCalc = leagueSize;
        }
        if(roundPickCalc === 1)
        {
            evenRound = !evenRound;
            draftRound++;
        }
        if(draftRound===0)
        {
            draftRound++;
            evenRound  = false;
        }
        if(evenRound)
        {
            teamDraftedNumber = leagueSize - roundPickCalc + 1
        }
        else
        {
            teamDraftedNumber = roundPickCalc;
        }
        let p = <li>{draftRound} . {roundPickCalc} <span>({pickCalc} )</span> {lastTenDrafted[i].playerToRank.playerName} / {lastTenDrafted[i].playerToRank.playerPos} by Team # {teamDraftedNumber}</li>
        lastTenPlayersDrafted.push(p);      
        pickCalc++;
    }
        allPlayerDiv = React.createElement(
            'ul', {
            className: classes.allPlayersList
        },
            React.createElement('li', { id: 'li1' }, lastTenPlayersDrafted))
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