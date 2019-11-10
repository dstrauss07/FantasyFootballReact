import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import DraftMenu from '../../DraftMenu/DraftMenu';
import DraftBanner from '../../DraftMenu/DraftBanner/DraftBanner';
import CheatSheet from '../../DraftMenu/CheatSheet/CheatSheet';
import DraftedPlayers from '../../DraftMenu/DraftedPlayers/DraftedPlayers';

const leagueTypes = ["standard", "ppr", "dynasty"]

let defaultDraftSettings = {
    leagueSize: 12,
    draftSlot: 1,
    totalStartingQb: 1,
    totalStartingRb: 2,
    totalStartingWr: 3,
    totalStartingTe: 1,
    totalStartingFlex: 1,
    totalStartingSFlex: 0,
    totalStartingD: 1,
    totalStartingK: 1,
    totalPlayer: 16,
    totalPlayers: 192,
    yourPickNum: null,
    leagueType: leagueTypes[0]
}

let draftSession = {
    selectedPlayers: [],
    draftComplete: false,
    currentPick: 1,
    teamPicking: 1,
    myTeam: null
}



class DraftManager extends Component {

    state = {
        playerRankings: this.props.playerRankings,
        isLoading: this.props.isLoading,
        currentUser: this.props.loggedInUser,
        currentLeagueSettings: defaultDraftSettings,
        currentDraftSession: draftSession,
        settingsOpen: true,
        sessionStarted: false,
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

    PlayerSelected = (event) => {
        var currentListOfPlayers = this.state.currentDraftSession.selectedPlayers;
        currentListOfPlayers.push(event);

        let nextPicker = this.FindWhoIsPicking();
        if (currentListOfPlayers.length < this.state.currentLeagueSettings.totalPlayers) {
            this.setState({
                currentDraftSession: {
                    selectedPlayers: currentListOfPlayers,
                    draftComplete: false,
                    currentPick: this.state.currentDraftSession.currentPick + 1,
                    teamPicking: nextPicker
                },

            })


            alert("pick #" + this.state.currentDraftSession.currentPick + " by Team #" + this.state.currentDraftSession.teamPicking);

            if (this.state.currentDraftSession.teamPicking == this.state.currentLeagueSettings.draftSlot) {
                alert("you picked!")
            }
        }
        else {
            console.log("draft completed");
            this.setState({
                currentDraftSession: {
                    selectedPlayers: currentListOfPlayers,
                    draftComplete: true
                }
            })
        }
    }


    FindWhoIsPicking = () => {
        let nextTeamPicking = this.state.currentDraftSession.teamPicking;
        let pickDividedByLeagueSize = parseInt(this.state.currentDraftSession.currentPick / this.state.currentLeagueSettings.leagueSize);
        if (this.state.currentDraftSession.currentPick % this.state.currentLeagueSettings.leagueSize == 0) {
            return nextTeamPicking;
        }
        else {
            switch (pickDividedByLeagueSize % 2) {
                case 0:
                    nextTeamPicking++;
                    break;
                case 1:
                    nextTeamPicking--;
                    break;
            }

            return nextTeamPicking;
        }
    }




    RevertPick = () => {
        var currentDraftedGroup = this.state.currentDraftSession.selectedPlayers;
        var i = currentDraftedGroup.length - 1;
        var previousDraftedGroup = currentDraftedGroup.splice(0, i);
        console.log(previousDraftedGroup);
        this.setState({
            currentDraftSession: {
                selectedPlayers: previousDraftedGroup,
                draftComplete: false
            }
        })
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
                <DraftedPlayers
                    leagueSettings={this.state.currentLeagueSettings}
                    draftSession={this.state.currentDraftSession}
                    revertPick={this.RevertPick}
                />
                <CheatSheet
                    currentRankings={this.state.playerRankings}
                    scoringType={this.state.currentLeagueSettings.leagueType}
                    draftType="Snake"
                    draftSession={this.state.currentDraftSession}
                    playerClicked={this.PlayerSelected} />
            </Aux>

        )
    }
}

export default DraftManager;