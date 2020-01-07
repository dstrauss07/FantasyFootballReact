import React, { Component } from 'react';
import Aux from '../../../../hoc/ReactAux';
import Classes from './Suggestions.module.css';
import SuggestPlayers from './SuggestPlayers/SuggestPlayers';

const Suggestions = (props) => {

  let draftDiv;
  let draftRound = props.draftSession.draftRound;
  
  let myTeam = props.draftSession.myTeam,
    myQb = myTeam.filter(p => p.playerToRank.playerPos === "QB"),
    myRb = myTeam.filter(p => p.playerToRank.playerPos === "RB"),
    myWr = myTeam.filter(p => p.playerToRank.playerPos === "WR"),
    myTe = myTeam.filter(p => p.playerToRank.playerPos === "TE"),
    myDst = myTeam.filter(p => p.playerToRank.playerPos === "DST"),
    myK = myTeam.filter(p => p.playerToRank.playerPos === "K"); 
  let myTeamGroups = {
    myQbs : myQb,
    myRbs:myRb,
    myWrs:myWr,
    myTes:myTe,
    myDsts:myDst,
    myKs:myK}; 
  let selectedPlayers = props.draftSession.selectedPlayers;
  let remainingPlayers = props.currentRankings;
  for (let i = 0; i < selectedPlayers.length; i++) {
    remainingPlayers = remainingPlayers.filter(p => p.playerToRank.playerId !== selectedPlayers[i].playerToRank.playerId);
  }
  let remQb = remainingPlayers.filter(p => p.playerToRank.playerPos === "QB"),
    remRb = remainingPlayers.filter(p => p.playerToRank.playerPos === "RB"),
    remWr = remainingPlayers.filter(p => p.playerToRank.playerPos === "WR"),
    remTe = remainingPlayers.filter(p => p.playerToRank.playerPos === "TE"),
    remDst = remainingPlayers.filter(p => p.playerToRank.playerPos === "DST"),
    remK = remainingPlayers.filter(p => p.playerToRank.playerPos === "K");

  let remainingPlayerGroups = {
    remQbs: remQb,
    remRbs: remRb,
    remWrs: remWr,
    remTes: remTe,
    remDsts: remDst,
    remKs:remK
  };

  if (draftRound < 2) {
    draftDiv = <div>Draft the Best Player Available</div>
  }
  else {
    if (myRb.length < 1) {
      draftDiv = <div>You need an RB1!</div>
    }
    else if (myWr.length < 1) {
      draftDiv = <div>You need an WR1!</div>
    }
    else {
      draftDiv = <div>Draft the Best Player</div>
    }
  }

  return (
    <Aux>
      <h4>Suggestions</h4>
      {draftDiv}
      <SuggestPlayers
        draftType={props.draftType}
        currentRankings={props.currentRankings}
        leagueSettings={props.leagueSettings}
        draftSession={props.draftSession}
        clicked={props.playerClicked}
        playersRemaining={remainingPlayers}
        remainingGroups = {remainingPlayerGroups}
        myTeamGroups = {myTeamGroups}


      />
    </Aux>
  )

}

export default Suggestions;

