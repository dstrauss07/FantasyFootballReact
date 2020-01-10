import React from 'react';
import Classes from './ConfirmPick.module.css';
import Aux from '../../../hoc/ReactAux'

const ConfirmPick = (props) =>{

  let playerToSelectDiv = <div>Nada</div>;
  const confirmProps = props;
  if(props.confirmProps.myTeam !== null && 
    props.confirmProps.myTeam !== undefined &&
    props.confirmProps.myTeam.length>0)
  {
      let playerToDraft = props.confirmProps.myTeam;
     playerToDraft =  playerToDraft.slice(-1);
    playerToSelectDiv = <div>Select {playerToDraft[0].playerToRank.playerName} </div>
  }


  return(
    <Aux>
      {playerToSelectDiv}
      <button onClick={()=>props.confirmClick(confirmProps,false)}> Confirm Pick</button>
      <button onClick={()=>props.confirmClick(confirmProps,true)}> Reject Pick</button>
    </Aux>


   )
}

export default ConfirmPick;