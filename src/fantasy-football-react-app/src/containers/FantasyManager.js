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

    SetLoginId = (currentLogin) =>
        this.setState({loginId: currentLogin});
    render() {
       
        const loggedInUser = this.state.loginId;
        const currentMode = this.state.mode;
        if(loggedInUser != null)
        {
            console.log(loggedInUser.userEmail + " is logged in");
        }
   

        if (currentMode === fantasyModes[0]) {
            return (
                <Aux>
                    <ControlMenu
                        currentMode={currentMode}
                        clickOptions={this.CurrentModeChangeHandler}
                        currentUser = {this.loginId}
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
                        currentUser = {this.loginId}
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
                        currentUser = {this.loginId}
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
                        currentUser = {this.loginId}
                    />
                    <LoginManager 
                        clickLogin ={this.SetLoginId}/>
                </Aux>
            )
        }
    }
}

export default FantasyManager;