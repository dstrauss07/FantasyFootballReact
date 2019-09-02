import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import DraftMenu from '../DraftMenu/DraftMenu';

class DraftManager extends Component
{
    state = {
        playerRankings: this.props.playerRankings,
        isLoading: this.props.isLoading,
        currentUser: this.props.loggedInUser,
    };

    render()
    {
        return(
   
            <Aux>
            <DraftMenu/>
            <div>
                Draft Manager!</div>
            </Aux>
 
        )
    }
} 

export default DraftManager;