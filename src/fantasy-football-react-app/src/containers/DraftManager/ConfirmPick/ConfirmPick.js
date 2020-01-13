import React from 'react';
import Classes from './ConfirmPick.module.css';
import Aux from '../../../hoc/ReactAux'

const ConfirmPick = (props) =>{
  let playerToSelectDiv = <div/>

  let confirmButton;
  let rejectButton

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
  }


  if(props.draftType=== "auction")
  {
    confirmButton = <button onClick={()=>props.confirmClick(false)}> Auction Pick</button>
    rejectButton = <button onClick={()=>props.confirmClick(true)}> Different Player</button>
  }


  
  return(
    <Aux>
      {playerToSelectDiv}
      {confirmButton}
      {rejectButton}
    </Aux>


   )
}

export default ConfirmPick;