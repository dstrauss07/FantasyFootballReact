import React, { Component } from 'react';
import Aux from '../hoc/Aux';
import axios from 'axios';

import RankingManager from './RankingManager/RankingManager';

const fantasyModes = ["Ranking", "Draft", "Auction"];


class FantasyManager extends Component {
    state = {
        mode: fantasyModes[0],
    }


    render() {

        const currentMode = this.state.mode;

        if (currentMode === fantasyModes[0]) {
            return (
                <Aux>
                    <RankingManager
                        // playersToRank = {this.state.playerRankings}
                        mode={this.state.mode} />
                </Aux>
            )
        }
        if (currentMode === fantasyModes[1]) {
            return (
                <Aux>
                    <p>Draft Mode</p>
                </Aux>
            )
        }
        if (currentMode === fantasyModes[2]) {
            return (
                <Aux>
                    <p>Auction Mode</p>
                </Aux>
            )
        }
    }
}

export default FantasyManager;