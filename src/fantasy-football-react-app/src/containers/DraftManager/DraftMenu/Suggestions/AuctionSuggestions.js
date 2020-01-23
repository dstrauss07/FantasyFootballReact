import React, { Component } from 'react';
import Aux from '../../../../hoc/ReactAux';
import Classes from './AuctionSuggestions.module.css';


const AuctionSuggestions = (props) =>{

  let playersSelected;
  let budgetRemaining = props.draftSession.myTeam.budgetRemaining;
  if(props.draftSession.myTeam.draftedPlayer !== undefined){
    playersSelected= props.draftSession.myTeam.draftedPlayer.length
  }

  let playersLeftToPick = props.leagueSettings.totalPlayer - playersSelected;
  let averageRemainingPerPlayer = parseInt(budgetRemaining/playersLeftToPick);
  let maximumBid = parseInt(budgetRemaining-playersLeftToPick)



  return(
    <Aux>
      <h4>Auction Suggestions</h4>
   <div>You have ${budgetRemaining} out of ${props.leagueSettings.startingBudget} remaining </div>
     <div>You have selected {playersSelected} out of {props.leagueSettings.totalPlayer} players </div>
     <div>Average per Player is ${averageRemainingPerPlayer}</div>
     <div>Maximum bid is ${maximumBid}</div>
     
    </Aux>
  )

}

export default AuctionSuggestions;