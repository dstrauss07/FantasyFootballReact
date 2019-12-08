import React, { Component } from 'react';
import Aux from '../../../hoc/ReactAux';
import DraftMenu from '../../DraftMenu/DraftMenu';
import DraftBanner from '../../DraftMenu/DraftBanner/DraftBanner';
import CheatSheet from '../../DraftMenu/CheatSheet/CheatSheet';
import MyDraftedPlayers from '../../DraftMenu/DraftedPlayers/MyDraftedPlayers';
import AllDraftedPlayers from '../../DraftMenu/DraftedPlayers/AllDraftedPlayers';
import Suggestions from '../../DraftMenu/Suggestions/Suggestions';
import WhenNextPick from '../../DraftMenu/WhenNextPick/WhenNextPick';
import Classes from './DraftManager.module.css';

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
    // myPlayers: [],
    allTeams: [],
    draftComplete: false,
    currentPick: 1,
    teamPicking: 1,
    prevTeamPicking: 0,
    draftRound: 1,
    roundPick: 1
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



    CreateAllTeams = (draftedPlayers) => {
        var leagueSize = this.state.currentLeagueSettings.leagueSize;
        let allTeamsUpdate = [];
        for (let i = 0; i < leagueSize; i++) {
            let playNum = i + 1;
            allTeamsUpdate[i] =
                {
                    name: 'player' + playNum, draftedPlayer: []
                }
        }
        if (draftedPlayers.length > 0) {
            for (let i = 0; i < draftedPlayers.length; i++) {
                let iIncrement = parseInt(i / leagueSize);
                iIncrement = Math.floor(iIncrement);
                if (iIncrement % 2 === 0) {
                    allTeamsUpdate[
                        i - (iIncrement * leagueSize)
                    ].draftedPlayer.push(draftedPlayers[i])
                }
                else {
                    allTeamsUpdate[
                        leagueSize - (i - (iIncrement * leagueSize) + 1)
                    ].draftedPlayer.push(draftedPlayers[i])
                }
            }
        }
        console.log(allTeamsUpdate);
        return allTeamsUpdate;
    }


    PlayerSelected = (event) => {
        var currentListOfPlayers = this.state.currentDraftSession.selectedPlayers;
        // var myCurrentPlayers = this.state.currentDraftSession.myPlayers;
        var thisTeamPicking = parseInt(this.state.currentDraftSession.teamPicking);
        var mySlot = parseInt(this.state.currentLeagueSettings.draftSlot);
        let nextPicker = this.FindWhoIsPicking(this.state.currentDraftSession.teamPicking);
        currentListOfPlayers.push(event);
        // if (thisTeamPicking === mySlot) {
        //     myCurrentPlayers.push(event);
        // }
        let allTeamsUpdated = this.CreateAllTeams(currentListOfPlayers);
        this.setState({
            currentDraftSession: {
                selectedPlayers: currentListOfPlayers,
                // myPlayers: myCurrentPlayers,
                draftComplete: false,
                currentPick: this.state.currentDraftSession.currentPick + 1,
                prevTeamPicking: thisTeamPicking,
                teamPicking: nextPicker,
                allTeams: allTeamsUpdated
            },
        }, console.log(this.state.currentDraftSession))
    }


    RevertPick = () => {
        const currentDraftedGroup = this.state.currentDraftSession.selectedPlayers;
        let currentPickValue = this.state.currentDraftSession.currentPick;
        var draftSlot = parseInt(this.state.currentLeagueSettings.draftSlot);
        let i = currentDraftedGroup.length - 1;
        const myDraftedGroup = this.state.currentDraftSession.myPlayers;
        let previousDraftedGroup = currentDraftedGroup.splice(0, i);
        let previousMyDraftedGroup = this.state.currentDraftSession.myPlayers;
        let prevTeamPicking = this.state.currentDraftSession.prevTeamPicking;
        // if (currentPickValue > 1) {
        //     if (prevTeamPicking === draftSlot) {
        //         if (previousMyDraftedGroup.length > 0) {
        //             console.log("removing from my players");
        //             var j = myDraftedGroup.length - 1;
        //             previousMyDraftedGroup = previousMyDraftedGroup.splice(0, j);
        //             this.setState({
        //                 currentDraftSession: {
        //                     myPlayers: previousMyDraftedGroup
        //                 }
        //             })
        //         }
        //     }
            let updatedPreviousPicker =
                this.FindPrevPickNumAfterRevert(prevTeamPicking, currentPickValue);
            currentPickValue--;
            let allTeamsUpdated = this.CreateAllTeams(previousDraftedGroup);
            this.setState({
                currentDraftSession: {
                    selectedPlayers: previousDraftedGroup,
                    draftComplete: false,
                    currentPick: currentPickValue,
                    prevTeamPicking: updatedPreviousPicker,
                    teamPicking: prevTeamPicking,
                    allTeams: allTeamsUpdated
                }
            });
    
    }

    FindWhoIsPicking = (whoPicking) => {
        let nextTeamPicking = whoPicking;
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
        }
        return nextTeamPicking;
    }

    FindPrevPickNumAfterRevert = (prevTeamPicking, currentPick) => {
        let prevPickNumToReturn = prevTeamPicking;
        let pickDividedByLeagueSize = parseInt(this.state.currentDraftSession.currentPick / this.state.currentLeagueSettings.leagueSize);
        if (currentPick % this.state.currentLeagueSettings.leagueSize === 1) {
            return prevPickNumToReturn;
        }
        else {
            switch (pickDividedByLeagueSize % 2) {
                case 0:
                    prevPickNumToReturn--;
                    break;
                case 1:
                    prevPickNumToReturn--;
                    break;
                default:
                    break;
            }
            return prevPickNumToReturn;
        }
    }

    UpdateLeagueSettingsHandler = (props) => {
        let updatedLeagueSettings = this.state.currentLeagueSettings;
        for (var key in updatedLeagueSettings) {
            if (props[key] != null) {
                updatedLeagueSettings[key] = props[key];
            }
            this.setState({
                currentLeagueSettings: updatedLeagueSettings,
                teamShown: updatedLeagueSettings.draftSlot
            }, () =>{
                let updatedDraftSession = this.state.currentDraftSession;
                let updatedAllTeams = this.CreateAllTeams
                (this.state.currentDraftSession.selectedPlayers);
                let myNewTeam = updatedAllTeams[this.state.currentLeagueSettings.draftSlot-1].draftedPlayer;
                updatedDraftSession.allTeams = updatedAllTeams;
                updatedDraftSession.myPlayers = myNewTeam;
                this.setState({
                    currentDraftSession: updatedDraftSession
                })
            }
            )
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

    MyDraftedPlayersDropdown = (e) => {
        this.setState({
            teamShown: e.target.value
        });
    }

    FilterDraftedPlayers = () => {
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
                <div className={Classes.containerDiv}>
                    <DraftBanner
                        currentLeagueSettings={this.state.currentLeagueSettings}
                        settingsOpen={this.state.settingsOpen}
                        toggleSettings={this.ToggleSettingsPanel} />

                    <div className={Classes.settingsBar}>
                        <div>
                            <DraftMenu
                                settingsOpen={this.state.settingsOpen}
                                toggleSettings={this.ToggleSettingsPanel}
                                clicked={this.UpdateLeagueSettingsHandler}
                                leagueSettings={this.state.currentLeagueSettings}
                                draftSession={this.state.currentDraftSession}
                            />
                        </div>
                        <div>
                            <WhenNextPick
                                leagueSettings={this.state.currentLeagueSettings}
                                draftSession={this.state.currentDraftSession}
                            />
                        </div>
                    </div>
                    <div className={Classes.draftedPlayers}>
                        <div>
                            <MyDraftedPlayers
                                leagueSettings={this.state.currentLeagueSettings}
                                draftSession={this.state.currentDraftSession}
                                revertPick={this.RevertPick}
                                teamShown={this.state.teamShown}
                                onDropdownSelected={this.MyDraftedPlayersDropdown}
                            />
                        </div>
                        <div>
                            <AllDraftedPlayers
                                leagueSettings={this.state.currentLeagueSettings}
                                draftSession={this.state.currentDraftSession}
                            />
                        </div>

                        <div>
                            <Suggestions
                                draftType={this.state.draftType}
                                currentRankings={this.state.playerRankings}
                                leagueSettings={this.state.currentLeagueSettings}
                                draftSession={this.state.currentDraftSession}
                            />
                        </div>
                    </div>
                    <CheatSheet
                        draftType={this.state.draftType}
                        currentRankings={this.state.playerRankings}
                        scoringType={this.state.currentLeagueSettings.leagueType}
                        draftSession={this.state.currentDraftSession}
                        playerClicked={this.PlayerSelected}
                        filterDrafted={this.FilterDraftedPlayers}
                        playersFilters={this.state.playersFiltered}
                    />
                </div>
            </Aux>
        )
    }
}

export default DraftManager;