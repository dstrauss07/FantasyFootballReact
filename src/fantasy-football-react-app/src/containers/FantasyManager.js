import React, { Component } from 'react';
import Aux from '../hoc/ReactAux';
import ControlMenu from './ControlMenu/ControlMenu';
import RankingManager from './RankingManager/RankingManager';
import LoginManager from './LoginManager/LoginManager';
import DraftManager from './DraftManager/DraftManager';
import axios from 'axios';


const fantasyModes = ["Ranking", "Draft", "Auction", "Login"];
const rankUri = 'https://localhost:44385/api/PlayerRanking/';

class FantasyManager extends Component {



    constructor(props){
        super(props);
        this.state = {
        mode: fantasyModes[0],
        loginId: null,
        playerRankings: null,
        loggedIn: false,
        isLoading: true,
        defaultId: 2025
    }
    this.pullRankingsFromApi();
}

    pullRankingsFromApi = () => {
        if (this.state.loginId != null) {
            axios.get(rankUri + this.state.loginId.testUserProfileId)
                .then(response => {
                    console.log(response);
                    this.setState((state, props)=>{
                        return{
                            playerRankings: response.data,
                            isLoading: false
                        }
                    })
                })
        }
        else {
            axios.get(rankUri + this.state.defaultId)
                .then(response => {
                    console.log(response);
                    this.setState((state, props)=>{
                        return{
                            playerRankings: response.data,
                            isLoading: false
                        }
                    })
                })
        }
    }



    CurrentModeChangeHandler = (modeSetNumber) => {
        console.log("CurrentModeChangeHandler");
        this.setState({ mode: fantasyModes[modeSetNumber] })
    }



    HandleLoggedInToggler = () => {
        console.log("handleLoggedIn");
        if (this.state.loggedIn) {
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
        SetLoginId = (currentLogin) =>
        this.setState({ loginId: currentLogin });

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
                        isLoading={this.state.isLoading} 
                        goToLogin={this.CurrentModeChangeHandler}/>
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
                        draftType="snake"
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
                    <DraftManager
                        loggedInUser={this.state.loginId}
                        playerRankings={this.state.playerRankings}
                        loggedIn={this.state.loggedIn}
                        draftType="auction"
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