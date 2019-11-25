import React from 'react';
import Aux from '../../../hoc/Aux';
import classes from './AllDraftedPlayers.module.css';
// import Classes from './AllDraftedPlayers.module.css';
// import { numberLiteralTypeAnnotation } from '@babel/types';
// import ReactDOM from 'react-dom';

const AllDraftedPlayers = (props) => {

    let draftedPlayers;
    if (props.draftSession != null) {
        draftedPlayers = props.draftSession.selectedPlayers
    };

    let totalPlayersDrafted = draftedPlayers.length;

    let leagueSize = props.leagueSettings.leagueSize;

    let lastTenPlayersDrafted = [];
    let allPlayerDiv;
    let teamDraftedNumber=1;


    if(totalPlayersDrafted === 0)
    {
         allPlayerDiv =React.createElement(
            'ul', {
                className: classes.allPlayersList
            },
            React.createElement('li',{id:'li1'},'No Players Selected Yet'))
    }
    else if (totalPlayersDrafted > 0 && totalPlayersDrafted <11)
    {
         for(let i = 1; i<= totalPlayersDrafted; i++)
         {
            let p = <li>{i} > {draftedPlayers[i-1].playerToRank.playerName} / {draftedPlayers[i-1].playerToRank.playerPos} by Team # {teamDraftedNumber}</li>
            lastTenPlayersDrafted.push(p);
            teamDraftedNumber++;
         }  

         allPlayerDiv =React.createElement(
            'ul', {
                className: classes.allPlayersList
            },
            React.createElement('li',{id:'li1'},lastTenPlayersDrafted))
    }

    else
    {
        let lastTenDrafted = draftedPlayers.slice(-10);
        let draftNum = totalPlayersDrafted-9;
        let roundPick  = draftNum % leagueSize;

        if (roundPick === 0)
        {
            roundPick = leagueSize;
        }


        console.log("draft Number" + draftNum);
        console.log("league size"  + leagueSize);
        console.log("round pick" + roundPick);
        let draftRound = parseInt((draftNum) / leagueSize) +1 ;
        console.log("draft round" + draftRound);
        let evenOrOddRound = "odd";
        

               
        for(let i = 1; i<=lastTenDrafted.length; i++)
        {
            if(draftRound===1)
            {
                evenOrOddRound = "odd";
                teamDraftedNumber = roundPick;
              }
            else switch(draftRound % 2)
            {
                case 0:
                evenOrOddRound = "even";
                break;
                case 1:
                evenOrOddRound = "odd";
                break;
                default:
               evenOrOddRound = "error";
               console.log("error");
                break;
            }
        if(evenOrOddRound === "odd")
            {
                teamDraftedNumber = roundPick;
            }
            else if(evenOrOddRound === "even")
            {
                teamDraftedNumber = leagueSize - roundPick + 1;
            }

            let p = <li>{draftNum} > {draftRound} . {roundPick}  {lastTenDrafted[i-1].playerToRank.playerName} / {lastTenDrafted[i-1].playerToRank.playerPos} by Team # {teamDraftedNumber}</li>
            lastTenPlayersDrafted.push(p);


            if(roundPick === 12)
            {
                draftRound++;
                roundPick = 1;
                if(evenOrOddRound === "odd")
                {
                    evenOrOddRound = "even";
                }
                else if(evenOrOddRound === "even")
                {
                    evenOrOddRound = "odd";
                }
            }
            else
            {
                roundPick++;
            }

            draftNum++;
        }

        allPlayerDiv =React.createElement(
            'ul', {
                className: classes.allPlayersList
            },
            React.createElement('li',{id:'li1'},lastTenPlayersDrafted))
    }
    return (
        <Aux>
        <div>All Players!!!</div>
        <div>
        {allPlayerDiv}
        </div>

        </Aux>
    )
}

export default AllDraftedPlayers;