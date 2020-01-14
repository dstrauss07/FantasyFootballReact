import React from 'react';
import Classes from './ConfirmPick.module.css';
import Aux from '../../../hoc/ReactAux'

const ConfirmPick = (props) =>{
  let playerToSelectDiv = <div/>

  let confirmButton;
  let rejectButton;
  let auctionForm;


  let HandleTeamPickingChange = (e) => {
      props.UpdateTeam(e.target.value);
  }

  let HandleBidChange = (e) => {
        props.UpdateBid(e.target.value);
  }


  if(props.playerOnAuction !== null)
  {

  playerToSelectDiv = <div>
  Select {props.playerOnAuction.playerToRank.playerName}?
  </div>
  }

  if(props.draftType === "snake")
  {
    confirmButton = <button onClick={()=>props.confirmClick(false)}> Confirm Pick</button>
    rejectButton = <button onClick={()=>props.confirmClick(true)}> Reject Pick</button>
    auctionForm = Classes.hide;
  }

  if(props.draftType=== "auction")
{
  confirmButton = <button onClick={()=>props.confirmClick(false)}> Auction Pick</button>
  rejectButton = <button onClick={()=>props.confirmClick(true)}> Different Player</button>
  auctionForm = Classes.show;
}


  let CreateSelectItems = () => {
    let teamTogglerOptions = [];
    for (let i = 1; i <= props.leagueSettings.leagueSize; i++) {
        if (i === props.teamShown) {
            teamTogglerOptions.push(<option selected="selected" key={i} value={i}>Team {i}</option>);
        }
        else {
            teamTogglerOptions.push(<option key={i} value={i}>Team {i}</option>);
        }
    }
    return teamTogglerOptions;
}





  
  return(
    <Aux>
      {playerToSelectDiv}
      {confirmButton}
      {rejectButton}

      <div className={auctionForm}>
            <select id="teamPicking" name="teamPicking" onChange={HandleTeamPickingChange}>
                       {CreateSelectItems()}
            </select>
            
            <label>Player Bid</label>
            <input type="number"
                    id="playerCost"
                    name="playerCost"
                    min="1"
                    max={props.leagueSettings.startingBudget}
                    onChange={HandleBidChange}
              />
      </div>
    </Aux>


   )
}

export default ConfirmPick;