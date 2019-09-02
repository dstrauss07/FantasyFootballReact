import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import DraftMenu from '../DraftMenu/DraftMenu';

const leagueTypes = ["standard","ppr","dynasty"]

let defaultAuctionSettings = {
    startingBudget: 200,
    leagueSize: 12,
    totalStartingQb: 1,
    totalStartingRb: 2,
    totalStartingWr: 3,
    totalStartingTe: 1,
    totalStartingFlex: 1,
    totalStartingSFlex: 0,
    totalStartingD: 1,
    totalStartingK: 1,
    totalPlayer: 16,
    leagueType: leagueTypes[0]
}

let auctionSession = {
    selectedPlayers : [],
    moneySpent : 0,
    auctionComplete : false
}

class AuctionManager extends Component
{

    state = {
        playerRankings: this.props.playerRankings,
        isLoading: this.props.isLoading,
        currentUser: this.props.loggedInUser,
        currentLeagueSettings: defaultAuctionSettings,
        currentAuctionSession: auctionSession,
        nominatedPlayer: null
    };

    UpdateLeagueSettingsHandler = (props) =>
    {
        this.setState({
            currentLeagueSettings : props
        })
    }


    render()
    {
        console.log(this.state.playerRankings);

        return(
            <Aux>
            <h3>Starting Budget = {this.state.currentLeagueSettings.startingBudget}</h3>
            <DraftMenu
            leagueType={"Auction"}
            leagueSettings={this.state.currentLeagueSettings}
            clicked = {this.UpdateLeagueSettingsHandler}
            />
            <div>Auction Manager!</div>
            </Aux>
        )
    }
} 

export default AuctionManager;