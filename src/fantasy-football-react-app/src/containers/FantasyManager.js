import React, { Component } from 'react';
import Aux from '../hoc/ReactAux';
import ControlMenu from './ControlMenu/ControlMenu';
import RankingManager from './RankingManager/RankingManager';
import LoginManager from './LoginManager/LoginManager';
import DraftManager from './DraftManager/DraftManager';
import axios from 'axios';


class FantasyManager extends Component {

    rankUri = 'https://localhost:44385/api/PlayerRanking/';
    fantasyModes = ["Ranking", "Draft", "Auction", "Login"];

    constructor(props) {
        super(props);
        this.state = {
            mode: this.fantasyModes[0],
            loginId: null,
            playerRankings: null,
            loggedIn: false,
            isLoading: true,
            defaultId: 2025
        }
        this.pullRankingsFromApi();
    }

    pullRankingsFromApi = () => {
        if (!this.state.loginId) {
            console.log("not logged In")
            axios.get(this.rankUri + this.state.defaultId)
                .then(response => {
                    console.log(response);
                    this.setState((state, props) => {
                        return {
                            playerRankings: response.data,
                            isLoading: false
                        }})})
        }
        else {
            console.log("logged in");
            axios.get(this.rankUri + this.state.loginId.testUserProfileId)
                .then(response => {
                    console.log(response);
                    this.setState((state, props) => {
                        return {
                            playerRankings: response.data,
                            isLoading: false
                        }})})}
    }

    currentModeChangeHandler = (modeSetNumber) => {
        this.setState({ mode: this.fantasyModes[modeSetNumber] })
    }

    loginToggler = () => {
        if (this.state.loggedIn) {
            this.setState({
                loggedIn: false,
                loginId: null
            })
        }
        else {
            this.setState({ loggedIn: true })
            this.pullRankingsFromApi();
        }
    }

    setLoginId = (currentLogin) =>{
        console.log(currentLogin);
        this.setState({ loginId: currentLogin });

    }

    render() {
        const currentMode = this.state.mode;
        if (currentMode === this.fantasyModes[0]) {
            return (
                <Aux>
                    <ControlMenu
                        currentMode={currentMode}
                        clickOptions={this.currentModeChangeHandler}
                        currentUser={this.state.loginId}
                        loggedInHandler={this.loginToggler}
                    />
                    <RankingManager
                        loggedInUser={this.state.loginId}
                        playerRankings={this.state.playerRankings}
                        loggedIn={this.state.loggedIn}
                        isLoading={this.state.isLoading}
                        goToLogin={this.currentModeChangeHandler}
                        rankUri= {this.rankUri} />
                </Aux>
            )
        }
        if (currentMode === this.fantasyModes[1]) {
            return (
                <Aux>
                    <ControlMenu
                        currentMode={currentMode}
                        clickOptions={this.currentModeChangeHandler}
                        currentUser={this.state.loginId}
                        loggedInHandler={this.loginToggler}
                    />
                    <DraftManager
                        loggedInUser={this.state.loginId}
                        playerRankings={this.state.playerRankings}
                        loggedIn={this.state.loggedIn}
                        draftType="snake"
                    />
                </Aux>
            )
        }
        if (currentMode === this.fantasyModes[2]) {
            return (
                <Aux>
                    <ControlMenu
                        currentMode={currentMode}
                        clickOptions={this.currentModeChangeHandler}
                        currentUser={this.state.loginId}
                        loggedInHandler={this.loginToggler}
                    />
                    <DraftManager
                        loggedInUser={this.state.loginId}
                        playerRankings={this.state.playerRankings}
                        loggedIn={this.state.loggedIn}
                        draftType="auction"
                    />
                </Aux>
            )
        }
        if (currentMode === this.fantasyModes[3]) {
            return (
                <Aux>
                    <ControlMenu
                        currentMode={currentMode}
                        clickOptions={this.currentModeChangeHandler}
                        currentUser={this.state.loginId}
                        loggedInHandler={this.loginToggler}
                    />
                    <LoginManager
                        clickLogin={this.setLoginId}
                        loggedInHandler={this.loginToggler}
                        changeMode={this.currentModeChangeHandler}
                    />
                </Aux>
            )
        }
    }
}

export default FantasyManager;