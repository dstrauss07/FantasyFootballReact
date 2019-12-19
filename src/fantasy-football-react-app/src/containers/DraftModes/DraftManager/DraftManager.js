import React, { Component } from 'react';
import Aux from '../../../hoc/ReactAux';
import DraftMenu from '../../DraftMenu/DraftMenu';
import DraftBanner from '../../DraftMenu/DraftBanner/DraftBanner';
import CheatSheet from '../../DraftMenu/CheatSheet/CheatSheet';
import MyDraftedPlayers from '../../DraftMenu/DraftedPlayers/MyDraftedPlayers';
import AllDraftedPlayers from '../../DraftMenu/DraftedPlayers/AllDraftedPlayers';
import SuggestPlayers from '../../DraftMenu/SuggestPlayers/SuggestPlayers';
import Suggestions from '../../DraftMenu/Suggestions/Suggestions';
import WhenNextPick from '../../DraftMenu/WhenNextPick/WhenNextPick';
import Classes from './DraftManager.module.css';

const leagueTypes = ["standard", "ppr", "dynasty"]

let defaultDraftSettings = {
    leagueSize: 6,
    draftSlot: 3,
    totalStartingQb: 1,
    totalStartingRb: 1,
    totalStartingWr: 1,
    totalStartingTe: 1,
    totalStartingFlex: 1,
    totalStartingSFlex: 0,
    totalStartingD: 1,
    totalStartingK: 1,
    totalPlayer: 10,
    leagueType: leagueTypes[0]
}

let defaultAuctionSettings = {
    startingBudget: 200,
    remainingBudget: 200,
    leagueSize: 12,
    draftSlot: 3,
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

let defaultDraftSession = {
    selectedPlayers: [],
    allTeams: [],
    myTeam: [],
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
        currentDraftSession: null,
        settingsOpen: true,
        sessionStarted: false,
        playersFiltered: false,
        teamShown: defaultDraftSettings.draftSlot,
        draftType: this.props.draftType
    };


    componentWillMount = () => {
        if (this.props.draftType === "snake") {
            this.setState({
                currentLeagueSettings: defaultDraftSettings,
                currentDraftSession: defaultDraftSession,
            })
        }
        else if (this.props.draftType === "auction") {
            this.setState({
                currentLeagueSettings: defaultAuctionSettings,
                currentDraftSession: defaultDraftSession
            })
        }
    }



    componentWillReceiveProps = (newProps) => {
        if (newProps.draftType !== this.props.draftType) {
            this.setState({
                draftType: newProps.draftType
            })

            if (newProps.draftType === "snake") {
                this.setState({
                    currentLeagueSettings: defaultDraftSettings,
                    currentDraftSession: defaultDraftSession,
                })
            }
            else if (newProps.draftType === "auction") {
                this.setState({
                    currentLeagueSettings: defaultAuctionSettings,
                    currentDraftSession: defaultDraftSession
                })
            }
        }
    }


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
        return allTeamsUpdate;
    }

    CreateMyTeam = (allTeams) => {
        let returnMyTeam = allTeams[this.state.currentLeagueSettings.draftSlot - 1].draftedPlayer;
        console.log(returnMyTeam);

        if (this.state.currentLeagueSettings.leagueType === leagueTypes[0]) {
            returnMyTeam.sort(function (a, b) {
                if (a.playerRanking.playerRank > b.playerRanking.playerRank) {
                    return 1;
                }
                if (a.playerRanking.playerRank < b.playerRanking.playerRank) {
                    return -1
                }
                return 0;
            });
            return returnMyTeam;
        }
        if (this.state.currentLeagueSettings.leagueType === leagueTypes[1]) {
            returnMyTeam.sort(function (a, b) {
                if (a.playerRanking.pprRank > b.playerRanking.pprRank) {
                    return 1;
                }
                if (a.playerRanking.pprRank < b.playerRanking.pprRank) {
                    return -1
                }
                return 0;
            });
            return returnMyTeam;
        }
        if(this.state.currentLeagueSettings.leagueType === leagueTypes[2])
        {
            returnMyTeam.sort(function (a, b) {
                if (a.playerRanking.dynastyRank > b.playerRanking.dynastyRank) {
                    return 1;
                }
                if (a.playerRanking.dynastyRank < b.playerRanking.dynastyRank) {
                    return -1
                }
                return 0;
            });
            return returnMyTeam;
        }
        else
        {
            return returnMyTeam;
        }
    }


PlayerSelected = (event) => {
    var currentListOfPlayers = this.state.currentDraftSession.selectedPlayers;
    var thisTeamPicking = parseInt(this.state.currentDraftSession.teamPicking);
    let nextPicker = this.FindWhoIsPicking(this.state.currentDraftSession.teamPicking);
    currentListOfPlayers.push(event);
    let allTeamsUpdated = this.CreateAllTeams(currentListOfPlayers);
    let newPickNum = this.state.currentDraftSession.currentPick + 1;
    let newRoundPick = this.DetermineRoundPick(newPickNum);
    let newDraftRound = this.DetermineDraftRound(newPickNum);
    let myTeamUpdated = this.CreateMyTeam(allTeamsUpdated);
    this.setState({
        currentDraftSession: {
            selectedPlayers: currentListOfPlayers,
            draftComplete: false,
            currentPick: newPickNum,
            prevTeamPicking: thisTeamPicking,
            teamPicking: nextPicker,
            allTeams: allTeamsUpdated,
            roundPick: newRoundPick,
            draftRound: newDraftRound,
            myTeam: myTeamUpdated
        },
    });
}

DetermineRoundPick = (newPickNum) => {
    var leagueSize = this.state.currentLeagueSettings.leagueSize;
    let newRoundPick = (newPickNum + leagueSize) % leagueSize;
    if (newRoundPick === 0) {
        newRoundPick = leagueSize
    }
    return newRoundPick;
}

DetermineDraftRound = (newPickNum) => {
    var leagueSize = this.state.currentLeagueSettings.leagueSize;
    var roundPick = this.state.currentDraftSession.roundPick;
    let newDraftRound = this.state.currentDraftSession.draftRound;

    if (roundPick === leagueSize) {
        newDraftRound++
    }

    return newDraftRound
}


RevertPick = () => {
    const currentDraftedGroup = this.state.currentDraftSession.selectedPlayers;
    let currentPickValue = this.state.currentDraftSession.currentPick;
    let i = currentDraftedGroup.length - 1;
    let previousDraftedGroup = currentDraftedGroup.splice(0, i);
    let prevTeamPicking = this.state.currentDraftSession.prevTeamPicking;
    let updatedPreviousPicker =
        this.FindPrevPickNumAfterRevert(prevTeamPicking, currentPickValue);
    currentPickValue--;
    let allTeamsUpdated = this.CreateAllTeams(previousDraftedGroup);
    let myTeamUpdated = this.CreateMyTeam(allTeamsUpdated);
    this.setState({
        currentDraftSession: {
            selectedPlayers: previousDraftedGroup,
            draftComplete: false,
            currentPick: currentPickValue,
            prevTeamPicking: updatedPreviousPicker,
            teamPicking: prevTeamPicking,
            allTeams: allTeamsUpdated,
            myTeam: myTeamUpdated
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
        }, () => {
            let updatedDraftSession = this.state.currentDraftSession;
            let updatedAllTeams = this.CreateAllTeams
                (this.state.currentDraftSession.selectedPlayers);
            let myNewTeam = this.CreateMyTeam(updatedAllTeams);
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
                <div className={Classes.draftTypeDiv}>
                    {this.props.draftType} Draft
                    </div>
                <DraftBanner
                    currentLeagueSettings={this.state.currentLeagueSettings}
                    settingsOpen={this.state.settingsOpen}
                    toggleSettings={this.ToggleSettingsPanel}
                    draftSession={this.state.currentDraftSession}
                    draftType={this.state.draftType} />


                <div className={Classes.settingsBar}>
                    <div>
                        <DraftMenu
                            settingsOpen={this.state.settingsOpen}
                            toggleSettings={this.ToggleSettingsPanel}
                            clicked={this.UpdateLeagueSettingsHandler}
                            leagueSettings={this.state.currentLeagueSettings}
                            draftSession={this.state.currentDraftSession}
                            draftType={this.state.draftType}
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
                        <SuggestPlayers
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