import React, { Component } from 'react';
import Aux from '../hoc/Aux';
import axios from 'axios';

import RankingManager from './RankingManager/RankingManager';

const fantasyModes = ["Ranking", "Draft", "Auction"];


class FantasyManager extends Component {
    state = {
        mode: fantasyModes[0],
        playerRankings: null,
        isLoading: true
    }

    componentDidMount() {
        console.log("component will mount called")
        axios.get('https://localhost:44385/api/PlayerRanking')
        .then(response => {
            console.log("axios players calls: " + response);
            this.setState({
                playerRankings: response.data,
                isLoading: false
            })
          })
      }


    render() {

        const currentMode = this.state.mode;

        if(this.state.isLoading)
        {
            return(
            <h3>Loading...</h3>
            )
        }

        if(!this.state.isLoading)
        {
            console.log("players To Rank! " + this.state.playerRankings);

        if(currentMode === fantasyModes[0])
        {
            return(
                <Aux>
                    <RankingManager 
                    playersToRank = {this.state.playerRankings}
                    mode = {this.state.mode} />
                </Aux>
            )
        }
        if(currentMode === fantasyModes[1])
        {
            return(
                <Aux>
                    <p>Draft Mode</p>
                </Aux>
            )
        }
        if(currentMode === fantasyModes[2])
        {
            return(
                <Aux>
                    <p>Auction Mode</p>
                </Aux>
            )
        }
    }


    }
}

export default FantasyManager;