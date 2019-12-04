import React from 'react';
import Aux from '../../../hoc/ReactAux';
import Classes from './WhenNextPick.module.css';
// import { debuggerStatement } from '@babel/types';

const WhenNextPick = (props) => {

    let yourPickNumber = parseInt(props.leagueSettings.draftSlot),
    currentPickNumber = parseInt(props.draftSession.currentPick),
    leagueSize = props.leagueSettings.leagueSize,
    yourNextPick, 
    yourNextPickString,
    yourNextPickArray,
    yourNextPickNumber = 0;

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
            yourNextPickString = yourNextPickNumber.toString();
            yourNextPick =  "You Pick in " + yourNextPickString;
        }
        else if ( roundPick === yourPickNumber)
        {
            yourNextPick = "It's Your Pick!";
        }
        else
        {

            yourNextPickNumber = picksRemainingInRound + leagueSize - yourPickNumber + 1;
            yourNextPickString = yourNextPickNumber.toString();
            yourNextPick =  "You Pick in " + yourNextPickString;
        }
    }
    else     
    {
        if(roundPick < ((leagueSize - yourPickNumber) +1))
        {
            yourNextPickNumber = leagueSize - yourPickNumber - roundPick + 1;
            yourNextPickString = yourNextPickNumber.toString();
            yourNextPick =  "You Pick in " + yourNextPickString;
        }
        else if((roundPick > ((leagueSize - yourPickNumber) +1)))
        {
            yourNextPickNumber = picksRemainingInRound + yourPickNumber;
            yourNextPickString = yourNextPickNumber.toString();
            yourNextPick =  "You Pick in " + yourNextPickString

        }    
        else if(roundPick === ((leagueSize - yourPickNumber) +1))
        {
            yourNextPick = "It's Your Pick!";
        }  
    }
 



return (
<Aux>
<div className={Classes.nextPickDiv}>

<div>{draftRound} - {roundPick}  ~ Pick Number: {currentPickNumber} ~ {yourNextPick}</div>
    </div>
</Aux>

)
}

export default WhenNextPick;