import React, { Component } from 'react';
import Aux from '../../../../../hoc/ReactAux';
import Classes from './SuggestPlayers.module.css';
import { arrayExpression } from '@babel/types';

const SuggestPlayers = (props) => {

  const draftSettings = props.leagueSettings;
  const draftSession = props.draftSession;
  const selectedPlayers = draftSession.selectedPlayers;
  const playerRankings = props.currentRankings;
  let remainingPlayers = props.playersRemaining;
  let remainingGroups = props.remainingGroups;
  let myTeamGroups = props.myTeamGroups;
  let suggestPlayer1, suggestPlayer2, suggestPlayer3;
  let suggestText1, suggestText2, suggestText3;
  let idToCheck, player;

  suggestPlayer1 = remainingPlayers[0];
  suggestText1 = <p>Best Player</p>

  if(props.draftSession.draftRound < 2)
  {
    suggestPlayer2 = remainingPlayers[1];
    suggestText2 = <p>Second Best</p>
    suggestPlayer3 = remainingPlayers[2];
    suggestText3 = <p>Third Best</p>
  }
  else
  {
    if(myTeamGroups.myRbs.length <1)
    {
      if(remainingGroups.remRbs[0] !== remainingPlayers[0])
      {
        suggestPlayer2 = remainingGroups.remRbs[0];
        suggestText2 = <p>Best Rb</p>
      }
      else
      {
        suggestPlayer2 = remainingGroups.remRbs[1];
        suggestText2 = <p>2nd Best Rb</p>
      }
    }
    else
    {
      suggestPlayer2 = remainingPlayers[1];
      suggestText2 = <p>Second Best</p>
    }
    if(myTeamGroups.myWrs.length <1)
    {
      if(remainingGroups.remWrs[0] !== suggestPlayer1)
      {
      suggestPlayer3 = remainingGroups.remWrs[0];
      suggestText3 = <p>Best Wr</p>
      }
      else if(remainingPlayers.remWrs[1] !== suggestPlayer2)
      {
        suggestPlayer3 = remainingGroups.remWrs[1];
        suggestText3 = <p>Second Best Wr</p>
      }
      else
      {
        suggestPlayer3 = remainingGroups.remWrs[0];
        suggestText3 = <p>Second Best Wr</p>
      }
    }
    else
    {
      suggestPlayer3 = remainingPlayers[2];
      suggestText3 = <p>Third Best Player</p>
    }
  }


  if(props.buttonDisabled){
    return (
      <Aux>
        <div className={Classes.suggestPlayerDiv}>
          <div>
            <button>{suggestPlayer1.playerToRank.playerName}</button>
            {suggestText1}
          </div>
          <div>
          <button>{suggestPlayer2.playerToRank.playerName}</button>
          {suggestText2}
          </div>
          <div>
          <button>{suggestPlayer3.playerToRank.playerName}</button>
          {suggestText3}
          </div>
  
        </div>
  
      </Aux>
    )
  }
  else{

  }
  return (
    <Aux>
      <div className={Classes.suggestPlayerDiv}>
        <div>

          <button onClick={() => { props.clicked(suggestPlayer1) }}>{suggestPlayer1.playerToRank.playerName}</button>
          {suggestText1}
        </div>
        <div>
        <button onClick={() => { props.clicked(suggestPlayer2) }}>{suggestPlayer2.playerToRank.playerName}</button>
        {suggestText2}
        </div>
        <div>
        <button onClick={() => { props.clicked(suggestPlayer3) }}>{suggestPlayer3.playerToRank.playerName}</button>
        {suggestText3}
        </div>

      </div>

    </Aux>
  )

}

export default SuggestPlayers;

