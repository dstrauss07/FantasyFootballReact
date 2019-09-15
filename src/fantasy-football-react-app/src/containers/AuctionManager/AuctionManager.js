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
       console.log(props);
        var updatedLeagueSettings = this.state.currentLeagueSettings;
        console.log("starting legue settings " + updatedLeagueSettings);
        for(var key in updatedLeagueSettings)
        {
            if(props[key] != null)
            {
                updatedLeagueSettings[key] = props[key];
            }

             this.setState({
            currentLeagueSettings : updatedLeagueSettings
        })

        }


    }


    render()
    {
        console.log(this.state.playerRankings);

        return(
            <Aux>
            
            <h3>Starting Budget = {this.state.currentLeagueSettings.startingBudget}</h3>
            <h3>leagueSize = {this.state.currentLeagueSettings.leagueSize}</h3>
            <h3>totalStartingQb = {this.state.currentLeagueSettings.totalStartingQb}</h3>
            <h3>totalStartingRb = {this.state.currentLeagueSettings.totalStartingRb}</h3>
            <h3>totalStartingWr = {this.state.currentLeagueSettings.totalStartingWr}</h3>
            <h3>totalStartingTe = {this.state.currentLeagueSettings.totalStartingTe}</h3>
            <h3>totalStartingFlex = {this.state.currentLeagueSettings.totalStartingFlex}</h3>
            <h3>totalStartingSFlex:= {this.state.currentLeagueSettings.totalStartingSFlex}</h3>
            <h3>totalStartingD: = {this.state.currentLeagueSettings.totalStartingD}</h3>
            <h3>totalStartingK: {this.state.currentLeagueSettings.totalStartingK}</h3>
            <h3>totalPlayer:= {this.state.currentLeagueSettings.totalPlayer}</h3>

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