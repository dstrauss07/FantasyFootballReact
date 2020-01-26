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
    confirmButton = <button onClick={()=>props.confirmClick(false)}> YASS!</button>
    rejectButton = <button onClick={()=>props.confirmClick(true)}> wait...</button>
    auctionForm = Classes.hide;
  }

  if(props.draftType=== "auction")
{
  confirmButton = <button onClick={()=>props.confirmClick(false)}> YASS!</button>
  rejectButton = <button onClick={()=>props.confirmClick(true)}> wait...</button>
  auctionForm = Classes.show;
}


  let CreateSelectItems = () => {
    let teamTogglerOptions = [];
    for (let i = 1; i <= props.leagueSettings.leagueSize; i++) {
        if (i === parseInt(props.teamShown)) {
          if(i=== parseInt(props.leagueSettings.draftSlot)){
            teamTogglerOptions.push(<option className={Classes.yourTeam} selected="selected" key={i} value={i}>Your Team</option>);
          }
          else{
            teamTogglerOptions.push(<option selected="selected" key={i} value={i}>Team {i}</option>);
          }
        }
        else {
          if(i=== parseInt(props.leagueSettings.draftSlot)){
            teamTogglerOptions.push(<option className={Classes.yourTeam} key={i} value={i}>Your Team</option>);
          }
          else{
            teamTogglerOptions.push(<option key={i} value={i}>Team {i}</option>);
          }
        }
    }
    return teamTogglerOptions;
}
  
 return(
        <Aux>

          <div className={Classes.confirmBox}>
            <div/>
            <div>
            <div className={Classes.auctionFormItem}>
         {playerToSelectDiv}
        {confirmButton}
        {rejectButton}
         </div>
         <div className={auctionForm}>
         <div className={Classes.auctionSelects}>
         <div className={Classes.auctionPlayerSelect}>
              <label>Team Picking</label>
              <select id="teamPicking" name="teamPicking" onChange={HandleTeamPickingChange}>
                         {CreateSelectItems()}
              </select>
              </div>
              <div className={Classes.auctionPlayerSelect}> 
              <label>Player Bid</label>
              <input type="number"
                      className={Classes.bidInput}
                      id="playerCost"
                      name="playerCost"
                      defaultValue="1"
                      min="1"
                      max={props.leagueSettings.startingBudget}
                      onChange={HandleBidChange}
                />
              </div>  
         </div>
   </div>
              <div/>
          </div>
              </div>        
      </Aux> 
     )
    }

export default ConfirmPick;