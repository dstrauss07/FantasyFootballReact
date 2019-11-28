import React, { Component } from 'react';
import Aux from '../../../hoc/ReactAux';
import DraftMenu from '../../DraftMenu/DraftMenu';
import DraftBanner from '../../DraftMenu/DraftBanner/DraftBanner';
import CheatSheet from '../../DraftMenu/CheatSheet/CheatSheet';
import MyDraftedPlayers from '../../DraftMenu/DraftedPlayers/MyDraftedPlayers';


const leagueTypes = ["standard", "ppr", "dynasty"]

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
    selectedPlayers: [],
    moneySpent: 0,
    auctionComplete: false
}


class AuctionManager extends Component {

    state = {
        playerRankings: this.props.playerRankings,
        isLoading: this.props.isLoading,
        currentUser: this.props.loggedInUser,
        currentLeagueSettings: defaultAuctionSettings,
        currentAuctionSession: auctionSession,
        nominatedPlayer: null,
        settingsOpen: true
    };

    UpdateLeagueSettingsHandler = (props) => {
        console.log(props);
        var updatedLeagueSettings = this.state.currentLeagueSettings;
        console.log("starting legue settings " + updatedLeagueSettings);
        for (var key in updatedLeagueSettings) {
            if (props[key] != null) {
                updatedLeagueSettings[key] = props[key];
            }

            this.setState({
                currentLeagueSettings: updatedLeagueSettings
            })

        }
    }

    ToggleSettingsPanel = () => {
        if (this.state.settingsOpen) {
            this.setState({ settingsOpen: false })
        }
        else {
            this.setState({ settingsOpen: true })
        }
    }


    render() {

        return (
            <Aux>
                <DraftBanner
                    currentLeagueSettings={this.state.currentLeagueSettings}
                    settingsOpen={this.state.settingsOpen} 
                    toggleSettings={this.ToggleSettingsPanel}/>

                <DraftMenu
                    leagueType={"Auction"}
                    leagueSettings={this.state.currentLeagueSettings}
                    settingsOpen={this.state.settingsOpen}
                    toggleSettings={this.ToggleSettingsPanel}
                    clicked={this.UpdateLeagueSettingsHandler}
                />
         <MyDraftedPlayers
         leagueSettings={this.state.currentLeagueSettings} 
                />
                <CheatSheet 
                  currentRankings = {this.state.playerRankings} 
                  scoringType = {this.state.currentLeagueSettings.leagueType}
                  draftType = "Auction"/>
            </Aux>
        )
    }
}

export default AuctionManager;