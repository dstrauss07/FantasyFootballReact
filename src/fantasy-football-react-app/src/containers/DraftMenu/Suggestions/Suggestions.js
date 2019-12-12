import React, { Component } from 'react';
import Aux from '../../../hoc/ReactAux';
import Classes from './Suggestions.module.css';

const Suggestions  = (props) =>
{
let draftDiv;

if(props.draftSession.draftRound <2)
{
  draftDiv = <div>Draft the Best Player Available</div>
}

  return (
    <Aux>

      <h4>Suggestions</h4>
      {draftDiv}
      

    </Aux>
)

  }
  
export default Suggestions;

  