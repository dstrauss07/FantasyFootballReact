import React, { Component } from 'react';
import Aux from '../../../../hoc/ReactAux';
import Classes from './Suggestions.module.css';
import SuggestPlayers from './SuggestPlayers/SuggestPlayers';
import {CreateMyTeamGroups} from '../../DraftScripts/CreateMyTeamGroups';
import {CreateRemainingPlayerGroups} from '../../DraftScripts/CreateRemainingPlayerGroups';
const Suggestions = (props) => {

    let draftDiv;
    let draftRound = props.draftSession.draftRound;
    let myTeamGroups = CreateMyTeamGroups(props.draftSession.myTeam);
    let remainingPlayers = CreateRemainingPlayerGroups( props.currentRankings,props.draftSession.selectedPlayers);

  
    if (draftRound < 2) {
      draftDiv = <div>Draft the Best Player Available</div>
    }
    else {
      if (myTeamGroups.myRbs.length < 1) {
        draftDiv = <div>You need an RB1!</div>
      }
      else if (myTeamGroups.myWrs.length < 1) {
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
          playersRemaining={remainingPlayers[0]}
          remainingGroups = {remainingPlayers[1]}
          myTeamGroups = {myTeamGroups}
        />
      </Aux>
    )



}

export default Suggestions;

