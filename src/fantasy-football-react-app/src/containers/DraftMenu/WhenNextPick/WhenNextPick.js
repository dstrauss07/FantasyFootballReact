import React from 'react';
import Aux from '../../../hoc/ReactAux';
import Classes from './WhenNextPick.module.css';
// import { debuggerStatement } from '@babel/types';

const WhenNextPick = (props) => {

    let yourPickNumber = parseInt(props.leagueSettings.draftSlot);
    let currentPickNumber = parseInt(props.draftSession.currentPick);
    let leagueSize = props.leagueSettings.leagueSize;
    let yourNextPick; 
    let yourNextPickNumber = 0;

    let roundPick = parseInt(currentPickNumber % leagueSize);
    if (roundPick === 0)
    {
        roundPick = leagueSize;
    }
    let draftRound = parseInt((currentPickNumber-1) / leagueSize) + 1;

    let picksRemainingInRound =   parseInt(leagueSize - roundPick);



    if (draftRound % 2 === 1) {
      
        if (roundPick < yourPickNumber) 
        {
            yourNextPickNumber = yourPickNumber - roundPick;
            yourNextPick =  <div>You Pick in {yourNextPickNumber}</div>
        }
        else if ( roundPick === yourPickNumber)
        {
            yourNextPick = "It's Your Pick!";
            alert("Your Pick!");
        }
        else
        {

            yourNextPickNumber = picksRemainingInRound + leagueSize - yourPickNumber + 1;
            yourNextPick =  <div>You Pick in {yourNextPickNumber}</div>
        }
    }
    else     
    {
        if(roundPick < ((leagueSize - yourPickNumber) +1))
        {
            yourNextPickNumber = leagueSize - yourPickNumber - roundPick + 1;
            yourNextPick =  <div>You Pick in {yourNextPickNumber}</div>
        }
        else if((roundPick > ((leagueSize - yourPickNumber) +1)))
        {
            yourNextPickNumber = picksRemainingInRound + yourPickNumber;
            yourNextPick =  <div>You Pick in {yourNextPickNumber}</div>
        }    
        else if(roundPick === ((leagueSize - yourPickNumber) +1))
        {
            yourNextPick = "It's Your Pick!";
            alert("Your Pick!");
        }  
    }
 



return (
<Aux>
<div className={Classes.nextPickDiv}>

<div>{draftRound} - {roundPick}  ~ Pick Number: {currentPickNumber}</div>
    <div> {yourNextPick}</div>
    </div>
</Aux>

)
}

export default WhenNextPick;