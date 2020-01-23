import React from 'react';
import Aux from '../../../../hoc/ReactAux';
import Classes from './BidSuggestions.module.css'

const BidSuggestions = (props) =>
{
console.log(props);
let qbDiv = <div></div>;
let rbDiv = <div></div>;
let wrDiv = <div></div>;
let teDiv = <div></div>;
let dstDiv =<div></div>
let kDiv = <div></div>


const CreatePlayerDiv =(player,startingNum) =>{
  let playerArray =[];
  if(startingNum > 0){
    console.log("yo");
    for(let i = 1; i<=startingNum; i++){
        let p = <li>{player}{i}</li>
        playerArray.push(p);
    }
  }
  let playerDiv = React.createElement(
    'ul',
    {className: Classes.qbPlayers},
      React.createElement('li', { id: 'li1' }, playerArray));

  return playerDiv;
}

if(props.leagueSettings.totalStartingQb > 0){
  qbDiv = CreatePlayerDiv("QB",props.leagueSettings.totalStartingQb)
}

if(props.leagueSettings.totalStartingRb>0){
  rbDiv=CreatePlayerDiv("RB",props.leagueSettings.totalStartingRb)
}
if(props.leagueSettings.totalStartingWr>0){
  wrDiv=CreatePlayerDiv("WR",props.leagueSettings.totalStartingWr)
}
if(props.leagueSettings.totalStartingTe>0){
  teDiv=CreatePlayerDiv("TE",props.leagueSettings.totalStartingTe)
}
if(props.leagueSettings.totalStartingD>0){
  dstDiv=CreatePlayerDiv("DST",props.leagueSettings.totalStartingD)
}
if(props.leagueSettings.totalStartingK>0){
  kDiv=CreatePlayerDiv("K",props.leagueSettings.totalStartingK)
}



return(
  <Aux>
    {qbDiv}
    {rbDiv}
    {wrDiv}
    {teDiv}
    {kDiv}
    {dstDiv}
  </Aux>
)

}

export default BidSuggestions;