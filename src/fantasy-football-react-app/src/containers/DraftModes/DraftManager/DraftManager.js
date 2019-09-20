import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import DraftMenu from '../../DraftMenu/DraftMenu';
import DraftBanner from '../../DraftMenu/DraftBanner/DraftBanner';

const leagueTypes = ["standard", "ppr", "dynasty"]

let defaultDraftSettings = {
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

let draftSession = {
    selectedPlayers: [],
    auctionComplete: false
}

class DraftManager extends Component {
    state = {
        playerRankings: this.props.playerRankings,
        isLoading: this.props.isLoading,
        currentUser: this.props.loggedInUser,
        currentLeagueSettings: defaultDraftSettings,
        currentDraftSession: draftSession,
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
                    toggleSettings={this.ToggleSettingsPanel} />

                <DraftMenu
                    leagueType={"Auction"}
                    leagueSettings={this.state.currentLeagueSettings}
                    settingsOpen={this.state.settingsOpen}
                    toggleSettings={this.ToggleSettingsPanel}
                    clicked={this.UpdateLeagueSettingsHandler}
                />
                <div>
                    Draft Manager!</div>
            </Aux>

        )
    }
}

export default DraftManager;