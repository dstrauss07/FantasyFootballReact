import React from 'react';
import Aux from '../../../hoc/ReactAux';
import classes from './AllDraftedPlayers.module.css';
// import Classes from './AllDraftedPlayers.module.css';
// import { numberLiteralTypeAnnotation } from '@babel/types';
// import ReactDOM from 'react-dom';

const AllDraftedPlayers = (props) => {

    let draftedPlayers;
    let totalPlayersDrafted = 0;
    if (props.draftSession != null) {
        draftedPlayers = props.draftSession.selectedPlayers
    };

    if(draftedPlayers!=null)
    {
        totalPlayersDrafted = draftedPlayers.length;
    }

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


        let draftRound = parseInt((draftNum) / (leagueSize+1)) +1 ;  
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
                console.log("pick # 12")
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

            if(roundPick === 1)
            {
                draftRound++;
            }

            draftNum++;
            console.log(evenOrOddRound)
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