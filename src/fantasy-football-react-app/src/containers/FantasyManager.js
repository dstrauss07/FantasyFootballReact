import React, { Component } from 'react';
import Aux from '../hoc/Aux';
import ControlMenu from './ControlMenu/ControlMenu';
import RankingManager from './RankingManager/RankingManager';
import LoginManager from './LoginManager/LoginManager';


const fantasyModes = ["Ranking", "Draft", "Auction", "Login"];


class FantasyManager extends Component {



    state = {
        mode: fantasyModes[0],
        loginId: null,
        playerRankings: null,
        loggedIn: false
    }

    CurrentModeChangeHandler = (modeSetNumber) => {
        this.setState({ mode: fantasyModes[modeSetNumber] })
    }

    SetLoginId = (currentLogin) =>
        this.setState({ loginId: currentLogin });

    HandleLoggedInToggler = () => {
        if (this.state.loggedIn) {
            console.log('loggin out');
            this.setState({ loggedIn: false, 
                loginId: null })
        }
        else {
            this.setState({ loggedIn: true })
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
                        loggedInHandler = {this.HandleLoggedInToggler}
                    />
                    <RankingManager
                        loggedInUser={this.state.loginId} />
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
                        loggedInHandler = {this.HandleLoggedInToggler}
                    />
                    <p>Draft Mode</p>
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
                        loggedInHandler = {this.HandleLoggedInToggler}
                    />
                    <p>Auction Mode</p>
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
                        loggedInHandler = {this.HandleLoggedInToggler}
                    />
                    <LoginManager
                        clickLogin={this.SetLoginId} 
                        loggedInHandler = {this.HandleLoggedInToggler}
                        changeMode = {this.CurrentModeChangeHandler}/>
                </Aux>
            )
        }
    }
}

export default FantasyManager;