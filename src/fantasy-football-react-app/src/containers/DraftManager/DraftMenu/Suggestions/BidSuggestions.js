import React from 'react';
import Aux from '../../../../hoc/ReactAux';
import Classes from './BidSuggestions.module.css';
import {CreateMyTeamGroups} from '../../DraftScripts/CreateMyTeamGroups';
import {CreateRemainingPlayerGroups} from '../../DraftScripts/CreateRemainingPlayerGroups';

const BidSuggestions = (props) =>
{
let qbDiv = <div></div>;
let rbDiv = <div></div>;
let wrDiv = <div></div>;
let teDiv = <div></div>;
let dstDiv =<div></div>
let kDiv = <div></div>
let flexDiv = <div></div>
let sflexDiv = <div></div>
let benchDiv = <div></div>




const CreatePlayerDiv =(player,startingNum) =>{
  let playerArray =[];
  if(startingNum > 0){
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


if(props.draftType==="snake"){
  let myTeamGroups = CreateMyTeamGroups(props.draftSession.myTeam);
}else{
  if(props.draftSession.myTeam.length>0)
  {
    let myTeamGroups = CreateMyTeamGroups(props.draftSession.myTeam.draftedPlayer); 
  }
}
  let remainingPlayers = CreateRemainingPlayerGroups( props.currentRankings,props.draftSession.selectedPlayers);

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
if(props.leagueSettings.totalStartingFlex>0){
  flexDiv=CreatePlayerDiv("FLEX",props.leagueSettings.totalStartingFlex)
}
if(props.leagueSettings.totalStartingSFlex>0){
  sflexDiv=CreatePlayerDiv("SFLEX",props.leagueSettings.totalStartingSFlex)
}



return(
  <Aux>
    <div className={Classes.biddingGrid}>
      <div className={Classes.primaryDiv}>
      {qbDiv}
    {rbDiv}
    {wrDiv}
      </div>
      <div>
      {teDiv}
    {kDiv}
    {dstDiv}
    {flexDiv}
    {sflexDiv}
      </div>
    </div>

  </Aux>
)

}

export default BidSuggestions;