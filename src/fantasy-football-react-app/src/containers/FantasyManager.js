import React, { Component } from 'react';
import Aux from '../hoc/ReactAux';
import ControlMenu from './ControlMenu/ControlMenu';
import RankingManager from './RankingManager/RankingManager';
import LoginManager from './LoginManager/LoginManager';
import DraftManager from './DraftModes/DraftManager/DraftManager';
import AuctionManager from './DraftModes/AuctionManager/AuctionManager';
import axios from 'axios';


const fantasyModes = ["Ranking", "Draft", "Auction", "Login"];
const rankUri = 'https://localhost:44385/api/PlayerRanking/';

class FantasyManager extends Component {



    state = {
        mode: fantasyModes[0],
        loginId: null,
        playerRankings: null,
        loggedIn: false,
        isLoading: true,
        defaultId: 2
    }


    componentDidMount = () => {
        this.pullRankingsFromApi();
    }

    pullRankingsFromApi = () => {
        if (this.state.loginId != null) {
            axios.get(rankUri + this.state.loginId.testUserProfileId)
                .then(response => {
                    this.setState({
                        playerRankings: response.data,
                        isLoading: false
                    })
                })

            console.log(this.state.playerRankings);
        }
        else {
            axios.get(rankUri + this.state.defaultId)
                .then(response => {
                    this.setState({
                        playerRankings: response.data,
                        isLoading: false
                    })
                })
        }
    }


    CurrentModeChangeHandler = (modeSetNumber) => {
        this.setState({ mode: fantasyModes[modeSetNumber] })
    }

    SetLoginId = (currentLogin) =>
        this.setState({ loginId: currentLogin });

    HandleLoggedInToggler = () => {
        if (this.state.loggedIn) {
            console.log('loggin out');
            this.setState({
                loggedIn: false,
                loginId: null
            })
        }
        else {
            this.setState({ loggedIn: true })
            this.pullRankingsFromApi()
        }

    }
    render() {

        const currentMode = this.state.mode;



        if (currentMode === fantasyModes[0]) {
            return (
                <Aux>
                    <ControlMenu
                        currentMode={currentMode}
                        clickOptions={this.CurrentModeChangeHandler}
                        currentUser={this.state.loginId}
                        loggedInHandler={this.HandleLoggedInToggler}
                    />
                    <RankingManager
                        loggedInUser={this.state.loginId}
                        playerRankings={this.state.playerRankings}
                        loggedIn={this.state.loggedIn}
                        isLoading={this.state.isLoading} />
                </Aux>
            )
        }
        if (currentMode === fantasyModes[1]) {
            return (
                <Aux>
                    <ControlMenu
                        currentMode={currentMode}
                        clickOptions={this.CurrentModeChangeHandler}
                        currentUser={this.state.loginId}
                        loggedInHandler={this.HandleLoggedInToggler}
                    />
                    <DraftManager
                        loggedInUser={this.state.loginId}
                        playerRankings={this.state.playerRankings}
                        loggedIn={this.state.loggedIn}
                    />
                </Aux>
            )
        }
        if (currentMode === fantasyModes[2]) {
            return (
                <Aux>
                    <ControlMenu
                        currentMode={currentMode}
                        clickOptions={this.CurrentModeChangeHandler}
                        currentUser={this.state.loginId}
                        loggedInHandler={this.HandleLoggedInToggler}
                    />
                    <AuctionManager
                        loggedInUser={this.state.loginId}
                        playerRankings={this.state.playerRankings}
                        loggedIn={this.state.loggedIn}
                    />
                </Aux>
            )
        }
        if (currentMode === fantasyModes[3]) {
            return (
                <Aux>
                    <ControlMenu
                        currentMode={currentMode}
                        clickOptions={this.CurrentModeChangeHandler}
                        currentUser={this.state.loginId}
                        loggedInHandler={this.HandleLoggedInToggler}
                    />
                    <LoginManager
                        clickLogin={this.SetLoginId}
                        loggedInHandler={this.HandleLoggedInToggler}
                        changeMode={this.CurrentModeChangeHandler} 
                        />
                </Aux>
            )
        }
    }
}

export default FantasyManager;