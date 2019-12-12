import React, { Component } from 'react';
import Aux from '../../../hoc/ReactAux';
import Classes from './SuggestPlayers.module.css';
import { arrayExpression } from '@babel/types';

const SuggestPlayers  = (props) =>
{

const draftSettings = props.leagueSettings;
const draftSession = props.draftSession;
const selectedPlayers = draftSession.selectedPlayers;
const playerRankings = props.currentRankings;
let remainingPlayers = playerRankings;
let suggestPlayer1, suggestPlayer2, suggestPlayer3;
let idToCheck,player;

if(selectedPlayers.length > 0)
{
  for( player of selectedPlayers)
  {
    idToCheck = player.playerToRank.playerId;
    remainingPlayers = remainingPlayers.filter(p => p.playerToRank.playerId !== idToCheck);
  }
}
else
{
  remainingPlayers =  playerRankings;
}

suggestPlayer1 = remainingPlayers[0].playerToRank.playerName;
suggestPlayer2 = remainingPlayers[1].playerToRank.playerName;
suggestPlayer3 = remainingPlayers[2].playerToRank.playerName;




 return (
    <Aux>
      <h4>suggested Players</h4>   
     <button>{suggestPlayer1}</button>
     <button>{suggestPlayer2}</button>
     <button>{suggestPlayer3}</button>
    </Aux>
)

  }
  
export default SuggestPlayers;

  