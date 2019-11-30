import React, { Component } from 'react';
import Aux from '../../../hoc/ReactAux';
import DraftMenu from '../../DraftMenu/DraftMenu';
import DraftBanner from '../../DraftMenu/DraftBanner/DraftBanner';
import CheatSheet from '../../DraftMenu/CheatSheet/CheatSheet';
import MyDraftedPlayers from '../../DraftMenu/DraftedPlayers/MyDraftedPlayers';
import AllDraftedPlayers from '../../DraftMenu/DraftedPlayers/AllDraftedPlayers';
import WhenNextPick from '../../DraftMenu/WhenNextPick/WhenNextPick';

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
    leagueType: leagueTypes[0]
}

let draftSession = {
    selectedPlayers: [],
    draftComplete: false,
    currentPick: 1,
    teamPicking: 1,
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
        playersFiltered: false,
        teamShown: defaultDraftSettings.draftSlot,
        draftType: "snake"
    };

    UpdateLeagueSettingsHandler = (props) => {
        var updatedLeagueSettings = this.state.currentLeagueSettings;
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
            this.setState({
                _settingsOpen: true,
                get settingsOpen() {
                    return this._settingsOpen;
                },
                set settingsOpen(value) {
                    this._settingsOpen = value;
                },
            })
        }
    }

    PlayerSelected = (event) => {
        var currentListOfPlayers = this.state.currentDraftSession.selectedPlayers;
        let nextPicker = this.FindWhoIsPicking();
        currentListOfPlayers.push(event);

        if (currentListOfPlayers.length < this.state.currentLeagueSettings.totalPlayers) {
            this.setState({
                currentDraftSession: {
                    selectedPlayers: currentListOfPlayers,
                    draftComplete: false,
                    currentPick: this.state.currentDraftSession.currentPick + 1,
                    teamPicking: nextPicker
                }
            })

            if (this.state.currentDraftSession.teamPicking === this.state.currentLeagueSettings.draftSlot) {
            }
        }
        else {
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
        if (this.state.currentDraftSession.currentPick % this.state.currentLeagueSettings.leagueSize === 0) {
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
                default:
                    break;
            }
            return nextTeamPicking;
        }
    }

    RevertPick = () => {
        var currentDraftedGroup = this.state.currentDraftSession.selectedPlayers;
        var i = currentDraftedGroup.length - 1;
        var previousDraftedGroup = currentDraftedGroup.splice(0, i);
        var currentPickValue = this.state.currentDraftSession.currentPick;
        currentPickValue--;
        this.setState({
            currentDraftSession: {
                selectedPlayers: previousDraftedGroup,
                draftComplete: false,
                currentPick: currentPickValue
            }
        })
    }

    OnDropdownSelected = (e) => {
        this.setState({
            teamShown: e.target.value
        });
    }

    FilterDraftedPlayers = () => {
        console.log(this.state.playersFiltered);
        if (this.state.playersFiltered) {
            this.setState({ playersFiltered: false })
        }
        else {
            this.setState({ playersFiltered: true })
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
                    settingsOpen={this.state.settingsOpen}
                    toggleSettings={this.ToggleSettingsPanel}
                    clicked={this.UpdateLeagueSettingsHandler}
                    leagueSettings={this.state.currentLeagueSettings}
                    draftSession={this.state.currentDraftSession}
                />
                <MyDraftedPlayers
                    leagueSettings={this.state.currentLeagueSettings}
                    draftSession={this.state.currentDraftSession}
                    revertPick={this.RevertPick}
                    teamShown={this.state.teamShown}
                    onDropdownSelected={this.OnDropdownSelected}
                />
                <AllDraftedPlayers
                    leagueSettings={this.state.currentLeagueSettings}
                    draftSession={this.state.currentDraftSession}
                />
                <WhenNextPick
                    leagueSettings={this.state.currentLeagueSettings}
                    draftSession={this.state.currentDraftSession}
                />
                <CheatSheet
                    draftType={this.state.draftType}
                    currentRankings={this.state.playerRankings}
                    scoringType={this.state.currentLeagueSettings.leagueType}
                    draftSession={this.state.currentDraftSession}
                    playerClicked={this.PlayerSelected}
                    filterDrafted={this.FilterDraftedPlayers}
                    playersFilters={this.state.playersFiltered}
                    draftSession={this.state.currentDraftSession}
                />
            </Aux>

        )
    }
}

export default DraftManager;