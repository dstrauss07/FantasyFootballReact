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
        console.log("odd round" + "roundPick:" + roundPick + "draft round" + draftRound)
        console.log("your Pick Number"  + yourPickNumber);
      
        if (roundPick < yourPickNumber) 
        {
            console.log("not your pick yet");

            yourNextPickNumber = yourPickNumber - roundPick;
            console.log(yourNextPickNumber);
            
            yourNextPick =  <div>You Pick in {yourNextPickNumber}</div>
        }
        else if ( roundPick === yourPickNumber)
        {
            console.log("your pick!")
            yourNextPick = "It's Your Pick!";
            alert("Your Pick!");
        }
        else
        {
            console.log("already picked")
            yourNextPickNumber = picksRemainingInRound + leagueSize - yourPickNumber + 1;
            yourNextPick =  <div>You Pick in {yourNextPickNumber}</div>
        }
    }
    else     
    {
        console.log("even round");
        console.log(draftRound + "-" + roundPick);
        if(roundPick < ((leagueSize - yourPickNumber) +1))
        {
            console.log("not yet");
            yourNextPickNumber = leagueSize - yourPickNumber - roundPick + 1;
            // yourNextPickInt = 
            yourNextPick =  <div>You Pick in {yourNextPickNumber}</div>
        }
        else if((roundPick > ((leagueSize - yourPickNumber) +1)))
        {
            console.log("already picked");
            yourNextPickNumber = picksRemainingInRound + yourPickNumber;
            yourNextPick =  <div>You Pick in {yourNextPickNumber}</div>
        }    
        else if(roundPick === ((leagueSize - yourPickNumber) +1))
        {
            console.log("your pick");
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