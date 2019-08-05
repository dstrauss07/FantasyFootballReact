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
        playerRankings: null
    }

    CurrentModeChangeHandler = (modeSetNumber) => {
        this.setState({ mode: fantasyModes[modeSetNumber] })
    }



    render() {

        const currentMode = this.state.mode;


        if (currentMode === fantasyModes[0]) {
            return (
                <Aux>
                    <ControlMenu
                        currentMode={currentMode}
                        clickOptions={this.CurrentModeChangeHandler}
                    />
                    <RankingManager 
                    loggedInUser = {this.state.loginId} />
                </Aux>
            )
        }
        if (currentMode === fantasyModes[1]) {
            return (
                <Aux>
                    <ControlMenu
                        currentMode={currentMode}
                        clickOptions={this.CurrentModeChangeHandler}
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
                    />
                    <LoginManager />
                </Aux>
            )
        }
    }
}

export default FantasyManager;