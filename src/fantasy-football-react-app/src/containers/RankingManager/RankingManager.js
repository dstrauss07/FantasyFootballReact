import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Players from '../../component/Players/Players';
import axios from 'axios';


const scoringTypes = ["standard", "ppr", "dynasty"];
const positionFilters = ["ALL", "QB", "RB", "WR", "TE", "DST", "K"]


class RankingManager extends Component {


    state = {
        scoringType: scoringTypes[0],
        positionFilter: positionFilters[0],
        playerRankings: null,
        isLoading: true
    }

    componentDidMount() {
        console.log("component will mount called")
        axios.get('https://localhost:44385/api/PlayerRanking')
            .then(response => {
                console.log("axios players calls: " + JSON.stringify(response));
                this.setState({
                    playerRankings: response.data,
                    isLoading: false
                })
            })
    }

    scoringChangeHandler(scoretype){
       this.setState({ scoringType: scoringTypes[scoretype] })
    }
    posChangeHandler(posfiltertype){
        this.setState({ positionFilter: positionFilters[posfiltertype] })
     }

     moveUpClickedHandler()
     {
         alert("Up!")
     }
     moveDownClickedHandler()
     {
         alert("Down!")
     }

    render() {

        if (this.state.isLoading) {
            return (
                <h3>Loading...</h3>
            )
        }

        if (!this.state.isLoading) {
            console.log("players To Rank! " + JSON.stringify(this.state.playerRankings));
            return (
                <Aux>
                    <p>{this.props.mode} Manager</p>
                    <p>{this.state.scoringType}</p>
                    <button onClick={() => this.scoringChangeHandler(0)}>Standard</button>
                    <button onClick={() => this.scoringChangeHandler(1)}>PPR</button>
                    <button onClick={() => this.scoringChangeHandler(2)}>Dynasty</button>
                    <p>{this.state.positionFilter}</p>
                    <button onClick={() => this.posChangeHandler(0)}>All</button>
                    <button onClick={() => this.posChangeHandler(1)}>QB</button>
                    <button onClick={() => this.posChangeHandler(2)}>RB</button>
                    <button onClick={() => this.posChangeHandler(3)}>WR</button>
                    <button onClick={() => this.posChangeHandler(4)}>TE</button>
                    <button onClick={() => this.posChangeHandler(5)}>DST</button>
                    <button onClick={() => this.posChangeHandler(6)}>K</button>
                    <main>
                    <Players
                        playersToRank={this.state.playerRankings}
                        playerScoringType={this.state.scoringType}
                        playerPositionFilter={this.state.positionFilter}
                        moveUpClicked={this.moveUpClickedHandler} 
                        moveDownClicked = {this.moveDownClickedHandler}/>
                    </main>
                </Aux>
            )
        }
    }
}


export default RankingManager;