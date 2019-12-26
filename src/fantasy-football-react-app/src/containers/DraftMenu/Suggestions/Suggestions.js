import React, { Component } from 'react';
import Aux from '../../../hoc/ReactAux';
import Classes from './Suggestions.module.css';

const Suggestions  = (props) =>
{

let draftDiv;
const draftRound = props.draftSession.draftRound;

if(draftRound <2)
{
  draftDiv = <div>Draft the Best Player Available</div>
}
else
{
const myTeam = props.draftSession.myTeam,
myQb = myTeam.filter(p =>p.playerToRank.playerPos === "QB"),
myRb = myTeam.filter(p =>p.playerToRank.playerPos === "RB"),
myWr = myTeam.filter(p =>p.playerToRank.playerPos === "WR"),
myTe = myTeam.filter(p =>p.playerToRank.playerPos === "TE"),
myDst = myTeam.filter(p =>p.playerToRank.playerPos === "DST"),
myK = myTeam.filter(p =>p.playerToRank.playerPos === "K");
const playerRankings = props.currentRankings;
const selectedPlayers = props.draftSession.selectedPlayers;
let remainingPlayers = playerRankings;

for(let i =0; i<selectedPlayers.length;i++)
{
  remainingPlayers= remainingPlayers.filter(p => p.playerToRank.playerId !== selectedPlayers[i].playerToRank.playerId);
}

let remQb = remainingPlayers.filter(p =>p.playerToRank.playerPos === "QB"),
remRb = remainingPlayers.filter(p =>p.playerToRank.playerPos === "RB"),
remWr = remainingPlayers.filter(p =>p.playerToRank.playerPos === "WR"),
remTe = remainingPlayers.filter(p =>p.playerToRank.playerPos === "TE"),
remDst = remainingPlayers.filter(p =>p.playerToRank.playerPos === "DST"),
remK = remainingPlayers.filter(p =>p.playerToRank.playerPos === "K");


  if(myRb.length <1)
  {
    draftDiv = <div>You need an RB1!</div>
  }
  else if(myWr.length<1)
  {
    draftDiv = <div>You need an WR1!</div>
  }
  else
  {
    draftDiv = <div>Draft the Best Player</div>
  }
}


  return (
    <Aux>

      <h4>Suggestions</h4>
      {draftDiv}
      

    </Aux>
)

  }
  
export default Suggestions;

  