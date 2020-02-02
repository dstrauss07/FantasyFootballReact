import React from 'react';
import Aux from '../../../../hoc/ReactAux';
import Classes from './BidSuggestions.module.css';
import { CreateMyTeamGroups } from '../../DraftScripts/CreateMyTeamGroups';
import { CreateRemainingPlayerGroups } from '../../DraftScripts/CreateRemainingPlayerGroups';
import { isConstructorDeclaration } from 'typescript';

const BidSuggestions = (props) => {

  const startingQb = props.leagueSettings.totalStartingQb,
    startingRb = props.leagueSettings.totalStartingRb,
    startingWr = props.leagueSettings.totalStartingWr,
    startingTe = props.leagueSettings.totalStartingTe,
    startingD = props.leagueSettings.totalStartingD,
    startingK = props.leagueSettings.totalStartingK,
    startingFlex = props.leagueSettings.totalStartingFlex,
    startingSFlex = props.leagueSettings.totalStartingSFlex;
  const remainingBudget = props.draftSession.myTeam.budgetRemaining;
  const totalStarters = startingQb + startingRb + startingWr + startingTe + startingD + startingK + startingFlex + startingSFlex;
  let totalPlayers = props.leagueSettings.totalPlayer;
  let benchNum = totalPlayers - totalStarters;
  let qbDiv = <div></div>,
    rbDiv = <div></div>,
    wrDiv = <div></div>,
    teDiv = <div></div>,
    dstDiv = <div></div>,
    kDiv = <div></div>,
    flexDiv = <div></div>,
    sflexDiv = <div></div>,
    benchDiv = <div></div>;
  let myTeamGroups = [];
  let bidSuggestionSpan;



  if (props.draftType === "snake") {
    myTeamGroups = CreateMyTeamGroups(props.draftSession.myTeam);
    bidSuggestionSpan = Classes.hide;

  }
  else {
    if (props.draftSession.myTeam !== null && props.draftSession.myTeam !== undefined) {
      if (props.draftSession.myTeam.draftedPlayer !== null && props.draftSession.myTeam.draftedPlayer !== undefined) {
        myTeamGroups = CreateMyTeamGroups(props.draftSession.myTeam.draftedPlayer);
      }
    }
  }

  const GetMyTeamGroup = (player) => {
    let myTeamGroupToCheck = [];   
    switch (player) {
      case "QB":
        myTeamGroupToCheck = myTeamGroups.myQbs;
        return myTeamGroupToCheck;
      case "RB":
        myTeamGroupToCheck = myTeamGroups.myRbs;
        return myTeamGroupToCheck;
      case "WR":
        myTeamGroupToCheck = myTeamGroups.myWrs;
        return myTeamGroupToCheck;
      case "TE":
        myTeamGroupToCheck = myTeamGroups.myTes;
        return myTeamGroupToCheck;
      case "DST":
        myTeamGroupToCheck = myTeamGroups.myDsts;
        return myTeamGroupToCheck;
      case "K":
        myTeamGroupToCheck = myTeamGroups.myKs;
        return myTeamGroupToCheck;
    }
  }

  const SortMyTeamGroup = (myTeamGroup) =>{
    let myTeamGroupToReturn;
    if(props.leagueSettings.leagueType === "standard")
    {
      myTeamGroupToReturn = myTeamGroup.sort(function(a,b){return a.playerRanking.playerRank - b.playerRanking.playerRank})
    }
    if(props.leagueSettings.leagueType === "ppr")
    {
      myTeamGroupToReturn = myTeamGroup.sort(function(a,b){return a.playerRanking.playerRank - b.playerRanking.playerRank})
    }
    if(props.leagueSettings.leagueType === "dynasty")
    {
      myTeamGroupToReturn = myTeamGroup.sort(function(a,b){return a.playerRanking.playerRank - b.playerRanking.playerRank})
    }
    return myTeamGroupToReturn;

  }


  const CreatePlayerDiv = (player, startingNum) => {
    let playerArray = [];
    if (startingNum > 0) {
      for (let i = 1; i <= startingNum; i++) {
        let selectedPlayer = "";
        let selectedPlayerName = "";
        let winningBid = "";
        let myTeamGroup = GetMyTeamGroup(player);
        console.log(player + i);
        console.log(myTeamGroup);
        if(myTeamGroup !== undefined && myTeamGroup !== null)
        {
          if(myTeamGroup.length > 1)
          {
          myTeamGroup = myTeamGroup.sort(function(a,b){return b.playerValue- a.playerValue})
          }
          if(myTeamGroup.length>0 && i<=myTeamGroup.length)
          {
            console.log(myTeamGroup);
            selectedPlayer = myTeamGroup[i-1];
            console.log(selectedPlayer);
            if(selectedPlayer!==undefined && selectedPlayer!==null){
            selectedPlayerName = selectedPlayer.playerToRank.playerName;
            winningBid= selectedPlayer.winningBid;
            } 
          }        
        }
        let playerSuggestedBid = GetSuggestedValue(player, i);
        if(winningBid !==undefined && winningBid != "")
        {
          playerSuggestedBid=<span className={Classes.winningBid}>{winningBid}</span>
        }
        let p = <li className={Classes.playerLi}>{player}{i} <span className={bidSuggestionSpan}> - ${playerSuggestedBid} {selectedPlayerName}
        </span></li>
        playerArray.push(p);
      }
    }
    let playerDiv = React.createElement(
      'ul',
      { className: Classes.playerList },
      React.createElement('li', { id: 'li1' }, playerArray));
    return playerDiv;
  }


  let totalBidSuggestion = 0;
  const GetSuggestedValue = (playerPos, posNum) => {

    switch (playerPos) {
      case "QB":
        if ((startingQb + startingSFlex) > 1) {
          if (posNum === 1) {

            console.log(props.draftSession.myTeam.budgetRemaining)
            let bidReturn = parseInt(remainingBudget * .12);
            totalBidSuggestion += bidReturn;
            return bidReturn
          }
          else if (posNum === 2) {
            let bidReturn = parseInt(remainingBudget * .05);
            totalBidSuggestion += bidReturn;
            return bidReturn
          }
          else {
            let bidReturn = parseInt(remainingBudget * .02);
            totalBidSuggestion += bidReturn;
            return bidReturn
          }
        }
        else {
          let bidReturn = parseInt(remainingBudget * .05);
          totalBidSuggestion += bidReturn;
          return bidReturn
        }
        break;
      case "RB":
        if (posNum === 1) {
          let bidReturn = parseInt(remainingBudget * .22);
          totalBidSuggestion += bidReturn;
          return bidReturn
        }
        if (posNum === 2) {
          let bidReturn = parseInt(remainingBudget * .11);
          totalBidSuggestion += bidReturn;
          return bidReturn
        }
        if (posNum === 3) {
          let bidReturn = parseInt(remainingBudget * .025);
          totalBidSuggestion += bidReturn;
          return bidReturn
        }
        else {
          let bidReturn = parseInt(remainingBudget * .01);
          totalBidSuggestion += bidReturn;
          return bidReturn
        }

      case "WR": if (posNum === 1) {
        let bidReturn = parseInt(remainingBudget * .225);
        totalBidSuggestion += bidReturn;
        return bidReturn
      }
        if (posNum === 2) {
          let bidReturn = parseInt(remainingBudget * .125);
          totalBidSuggestion += bidReturn;
          return bidReturn
        }
        if (posNum === 3) {
          let bidReturn = parseInt(remainingBudget * .075);
          totalBidSuggestion += bidReturn;
          return bidReturn
        }
        else {
          let bidReturn = parseInt(remainingBudget * .01);
          totalBidSuggestion += bidReturn;
          return bidReturn
        }
        ;
      case "TE":
        if (posNum === 1) {
          let bidReturn = parseInt(remainingBudget * .05);
          totalBidSuggestion += bidReturn;
          return bidReturn
        }
        if (posNum === 2) {
          let bidReturn = parseInt(remainingBudget * .025);
          totalBidSuggestion += bidReturn;
          return bidReturn
        }
        else {
          let bidReturn = parseInt(remainingBudget * .005);
          totalBidSuggestion += bidReturn;
          return bidReturn
        };
      case "DST":
        let bidReturn = parseInt(remainingBudget * .005);
        totalBidSuggestion += bidReturn;
        return bidReturn;

      case "FLEX":
        if (posNum === 1) {
          let bidReturn = parseInt(remainingBudget * .025);
          totalBidSuggestion += bidReturn;
          return bidReturn
        }
        else {
          let bidReturn = parseInt(remainingBudget * .01);
          totalBidSuggestion += bidReturn;
          return bidReturn
        };;
      case "SFLEX":
        if (posNum === 1) {
          let bidReturn = parseInt(remainingBudget * .025);
          totalBidSuggestion += bidReturn;
          return bidReturn
        }
        else {
          let bidReturn = parseInt(remainingBudget * .01);
          totalBidSuggestion += bidReturn;
          return bidReturn
        };
      default:
        {
          let bidReturn = parseInt(remainingBudget * .005);
          totalBidSuggestion += bidReturn;
          return bidReturn;
        }
    }
  }
  const CreateBenchDiv = (benchTotal) => {
    let benchArray = [];
    let benchBid;
    if (benchNum > 6) {
      benchTotal += 6 - benchNum
    }
    for (let j = 1; j <= benchNum; j++) {
      if (j === 1) {

        benchBid = parseInt(benchTotal / 3);
      }
      else if (j === 2) {

        benchBid = parseInt(benchTotal / 4);
      }
      else if (j === 3) {

        benchBid = parseInt(benchTotal / 6);
      }
      else if (j > 3 && j < 7) {

        benchBid = parseInt(benchTotal / 12);;
      }
      else {
        benchBid = 1
      }
      let p = <li className={Classes.playerLi}>Bench <span className={bidSuggestionSpan}>- ${benchBid} </span></li>
      benchArray.push(p);
    }
    let benchDivToReturn = React.createElement(
      'ul', { className: Classes.playerList }, React.createElement('li', { id: 'li1' }, benchArray));
    return benchDivToReturn;
  }

  if (props.leagueSettings.totalStartingQb > 0) {
    qbDiv = CreatePlayerDiv("QB", props.leagueSettings.totalStartingQb);
  }
  if (props.leagueSettings.totalStartingRb > 0) {
    rbDiv = CreatePlayerDiv("RB", props.leagueSettings.totalStartingRb);
  }
  if (props.leagueSettings.totalStartingWr > 0) {
    wrDiv = CreatePlayerDiv("WR", props.leagueSettings.totalStartingWr);
  }
  if (props.leagueSettings.totalStartingTe > 0) {
    teDiv = CreatePlayerDiv("TE", props.leagueSettings.totalStartingTe);
  }
  if (props.leagueSettings.totalStartingD > 0) {
    dstDiv = CreatePlayerDiv("DST", props.leagueSettings.totalStartingD);
  }
  if (props.leagueSettings.totalStartingK > 0) {
    kDiv = CreatePlayerDiv("K", props.leagueSettings.totalStartingK);
  }
  if (props.leagueSettings.totalStartingFlex > 0) {
    flexDiv = CreatePlayerDiv("FLEX", props.leagueSettings.totalStartingFlex);
  }
  if (props.leagueSettings.totalStartingSFlex > 0) {
    sflexDiv = CreatePlayerDiv("SFLEX", props.leagueSettings.totalStartingSFlex);
  }

  if (benchNum > 0) {
    benchDiv = CreateBenchDiv(remainingBudget * .15);
  }

  return (
    <Aux>
      <div className={Classes.biddingGrid}>
        <div className={Classes.primaryDiv}>
          {qbDiv}
          {rbDiv}
          {wrDiv}
        </div>
        <div className={Classes.secondDiv}>
          {teDiv}
          {kDiv}
          {dstDiv}
          {flexDiv}
          {sflexDiv}
        </div>
        <div className={Classes.benchDiv}>
          {benchDiv}
        </div>

      </div>

    </Aux>
  )

}

export default BidSuggestions;