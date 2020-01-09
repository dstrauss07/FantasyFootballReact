import React, { Component } from 'react';
import Aux from '../../hoc/ReactAux';
import DraftMenu from './DraftMenu/DraftMenu';
import DraftBanner from './DraftMenu/DraftBanner/DraftBanner';
import CheatSheet from './CheatSheet/CheatSheet';
import MyDraftedPlayers from './DraftMenu/DraftedPlayers/MyDraftedPlayers';
import AllDraftedPlayers from './DraftMenu/DraftedPlayers/AllDraftedPlayers';
import Suggestions from './DraftMenu/Suggestions/Suggestions';
import WhenNextPick from './DraftMenu/WhenNextPick/WhenNextPick';
import Classes from './DraftManager.module.css';
import ConfirmPick from './ConfirmPick/ConfirmPick';
import classes from './DraftManager.module.css';

const leagueTypes = ["standard", "ppr", "dynasty"]

//Default Settings
const defaultAuctionSettings = {
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

const defaultDraftSettings = {
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

const defaultDraftSession = {
    confirmMode: false,
    selectedPlayers: [],
    allTeams: [],
    myTeam: [],
    draftComplete: false,
    currentPick: 1,
    draftRound: 1,
    roundPick: 1
}

const defaultConfirmProps = {
    confirmMode: false,
    selectedPlayers: [],
    allTeams: [],
    myTeam: [],
    draftComplete: false,
    currentPick: 1,
    draftRound: 1,
    roundPick: 1
}

let confirmClass = Classes.hide;
let mainClass = Classes.show;

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
        draftType: this.props.draftType,
        confirmPickProps : defaultConfirmProps
        }

    /* Life Cycle scripts */

    componentWillMount = () => {
        if (this.props.draftType === "snake") {
            this.setState({
                currentLeagueSettings: defaultDraftSettings,
                currentDraftSession: defaultDraftSession
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
        }
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

    componentDidUpdate = () =>{
        if(this.state.confirmPickProps.confirmMode)
        {           
            mainClass = Classes.hide;
            confirmClass = Classes.show;
        }
        else
        {
            confirmClass = Classes.hide;
            mainClass = Classes.show;
        }
    }
    
    ConfirmDraftPick= (props) =>{
        mainClass = Classes.show;
        confirmClass = Classes.hide;
        let confirmProps = props.confirmProps;
        let defaultProps = defaultConfirmProps;
        this.setState({                 
            confirmPickProps:defaultProps,
            currentDraftSession:confirmProps
        });
    }

    RejectDraftPick= () =>{
        mainClass = Classes.show;
        confirmClass = Classes.hide; 
        let defaultProps = defaultConfirmProps;
        this.setState({                 
            confirmPickProps:defaultProps,
        });
    }

    CreateAllTeams = (draftedPlayers, leagueSize) => {
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
        return allTeamsUpdate;
    }
}

    CreateMyTeam = (allTeams,draftSlot,leagueType) => {
        let returnMyTeam = allTeams[draftSlot - 1].draftedPlayer;
        if (leagueType === leagueTypes[0]) {
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
        if (this.state.currentLeagueSettings.leagueType === leagueTypes[2]) {
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
        else {
            return returnMyTeam;
        }
    }

    DetermineDraftRound = (newPickNum, leagueSize) => {
        const newPickNumInt =  parseInt(newPickNum);
        const leagueSizeInt = parseInt(leagueSize);
        let newDraftRound = parseInt(((newPickNumInt - 1) /leagueSizeInt)+1);
        return newDraftRound;
    }

    DetermineRoundPick = (newPickNum, leagueSize) => {
        var leagueSizeInt = parseInt(leagueSize);
        let newRoundPick = (newPickNum + leagueSizeInt) % leagueSizeInt;
        if (newRoundPick === 0) {
            newRoundPick = leagueSizeInt
        }
        return newRoundPick;
    }


    FilterDraftedPlayers = () => {
        if (this.state.playersFiltered) {
            this.setState({ playersFiltered: false })
        }
        else {
            this.setState({ playersFiltered: true })
        }
    }

    PlayerSelected = (event) => {
        const prevMyTeamLength =this.state.currentDraftSession.myTeam.length;
        var currentListOfPlayers = this.state.currentDraftSession.selectedPlayers;
        currentListOfPlayers.push(event);
        let allTeamsUpdated = this.CreateAllTeams(currentListOfPlayers, this.state.currentLeagueSettings.leagueSize);
        let newPickNum = this.state.currentDraftSession.currentPick + 1;
        let newRoundPick = this.DetermineRoundPick(newPickNum, this.state.currentLeagueSettings.leagueSize);
        let newDraftRound = this.DetermineDraftRound(newPickNum, this.state.currentLeagueSettings.leagueSize);
        let myTeamUpdated = this.CreateMyTeam(allTeamsUpdated, this.state.currentLeagueSettings.draftSlot, this.state.currentLeagueSettings.leagueType);  
        if (myTeamUpdated.length >prevMyTeamLength )
        {
            let playerToConsider = myTeamUpdated.slice(-1);
            this.setState({
                confirmPickProps:
                {
                    confirmMode: true,
                    selectedPlayers: currentListOfPlayers,
                    allTeams: allTeamsUpdated,
                    myTeam: myTeamUpdated,
                    draftComplete: false,
                    currentPick: newPickNum,
                    draftRound: newDraftRound,
                    roundPick: newRoundPick
                }
            },()=> {this.forceUpdate(); })  
           }
        else
        {
            this.setState({
                currentDraftSession: {
                    selectedPlayers: currentListOfPlayers,
                    currentPick: newPickNum,
                    allTeams: allTeamsUpdated,
                    roundPick: newRoundPick,
                    draftRound: newDraftRound,
                    myTeam: myTeamUpdated
                }});
        }
    }

    RevertPick = () => {
        const currentDraftedGroup = this.state.currentDraftSession.selectedPlayers;
        let i = currentDraftedGroup.length - 1;
        let previousDraftedGroup = currentDraftedGroup.splice(0, i);
        let newPickNum = this.state.currentDraftSession.currentPick - 1;
        let newRoundPick = this.DetermineRoundPick(newPickNum, this.state.currentLeagueSettings.leagueSize);
        let newDraftRound = this.DetermineDraftRound(newPickNum, this.state.currentLeagueSettings.leagueSize);
        let allTeamsUpdated = this.CreateAllTeams(previousDraftedGroup, this.state.currentLeagueSettings.leagueSize);
        let myTeamUpdated = this.CreateMyTeam(allTeamsUpdated, this.state.currentLeagueSettings.draftSlot, this.state.currentLeagueSettings.leagueType);
        this.setState({
            currentDraftSession: {
                selectedPlayers: previousDraftedGroup,
                draftComplete: false,
                currentPick: newPickNum,
                roundPick: newRoundPick,
                draftRound: newDraftRound,
                allTeams: allTeamsUpdated,
                myTeam: myTeamUpdated
            }});
    }

    UpdateLeagueSettingsHandler = (props) => {
        let updatedLeagueSettings = this.state.currentLeagueSettings;
        for (var key in updatedLeagueSettings) {
            if (props[key] != null) {
                updatedLeagueSettings[key] = props[key];
            }
            if(updatedLeagueSettings.draftSlot>updatedLeagueSettings.leagueSize)
            {
                updatedLeagueSettings.draftSlot = updatedLeagueSettings.leagueSize;
            }
            this.setState({
                currentLeagueSettings: updatedLeagueSettings,
                teamShown: updatedLeagueSettings.draftSlot
            }, () => {
                let updatedDraftSession = this.state.currentDraftSession;
                let updatedAllTeams =  this.CreateAllTeams(this.state.currentDraftSession.selectedPlayers, this.state.currentLeagueSettings.leagueSize);
                let myNewTeam = this.CreateMyTeam(updatedAllTeams, this.state.currentLeagueSettings.draftSlot, this.state.currentLeagueSettings.leagueType);
                let updatedPlayerRanks = this.SortPlayerRankings(this.state.playerRankings,this.state.currentLeagueSettings.leagueType);       
                updatedDraftSession.allTeams = updatedAllTeams;
                updatedDraftSession.myPlayers = myNewTeam;
                updatedDraftSession.roundPick = this.DetermineRoundPick(this.state.currentDraftSession.currentPick, this.state.currentLeagueSettings.leagueSize);
                updatedDraftSession.draftRound = this.DetermineDraftRound(this.state.currentDraftSession.currentPick, this.state.currentLeagueSettings.leagueSize);
                this.setState({
                    currentDraftSession: updatedDraftSession,
                    currentRankings:updatedPlayerRanks
                })}
        )
    }
}

    SortPlayerRankings = (playerRankings, leagueType) =>{
        let playerRanksToReturn = playerRankings;
        switch(leagueType){
            case "standard":
                playerRanksToReturn = playerRanksToReturn.sort(function(a,b){
                    if (a.playerRanking.playerRank > b.playerRanking.playerRank) {
                        return 1;
                    }
                    if (a.playerRanking.playerRank < b.playerRanking.playerRank) {
                        return -1
                    }
                    return 0;
                });
            break;
            case "ppr":
                playerRanksToReturn = playerRanksToReturn.sort(function(a,b){
                    if (a.playerRanking.pprRank > b.playerRanking.pprRank) {
                        return 1;
                    }
                    if (a.playerRanking.pprRank < b.playerRanking.pprRank) {
                        return -1
                    }
                    return 0;
                });
            break;
            case "dynasty":
                playerRanksToReturn = playerRanksToReturn.sort(function(a,b){
                    if (a.playerRanking.dynastyRank > b.playerRanking.dynastyRank) {
                        return 1;
                    }
                    if (a.playerRanking.dynastyRank < b.playerRanking.dynastyRank) {
                        return -1
                    }
                    return 0;
                });
            break;
            default:
            break; 
        }
        return playerRanksToReturn;
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
            })}
    }

    MyDraftedPlayersDropdown = (e) => {
        this.setState({
            teamShown: e.target.value
        });
    }

    render() {
        return (
            <Aux>
                <div className={Classes.containerDiv}>
                    <div className={mainClass}>
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
                                playerClicked={this.PlayerSelected}
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
                    <div className={confirmClass}>
                    <ConfirmPick 
                    confirmProps = {this.state.confirmPickProps}
                    confirmClick = {this.ConfirmDraftPick}
                    rejectClick={this.RejectDraftPick}
                    />
                    </div>
                </div>
            </Aux>
        )}
    }

export default DraftManager;