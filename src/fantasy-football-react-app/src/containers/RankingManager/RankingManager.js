import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Players from '../../component/Players/Players';
import axios from 'axios';
import Classes from './RankingManager.module.css';
import RankingController from './RankingController/RankingController';
import { debuggerStatement } from '@babel/types';


const rankUri = 'https://localhost:44385/api/PlayerRanking/'

const scoringTypes = ["standard", "ppr", "dynasty"];
const positionFilters = ["ALL", "QB", "RB", "WR", "TE", "DST", "K"]


class RankingManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scoringType: scoringTypes[0],
            positionFilter: positionFilters[0],
            playerRankings: null,
            isLoading: true,
            isChanged:false,
            profileId: 2,
        };
    }

    componentDidMount = () => {
        console.log("component will mount called")
        axios.get(rankUri + this.state.profileId)
            .then(response => {
                console.log("axios players calls: " + JSON.stringify(response));
                this.setState({
                    playerRankings: response.data,
                    isLoading: false
                })
            })
    }

    saveRankingsHandler = () =>{
            let playerRankingsToUpdate= [];
            let currentPlayerRanking;
            let playerRank;

            for(playerRank in this.state.playerRankings)
            {
                currentPlayerRanking = this.state.playerRankings[playerRank];
                playerRankingsToUpdate.push(currentPlayerRanking);
            }

           
            axios.patch(rankUri, playerRankingsToUpdate)
                .then(response=>{
                   
                })
                .catch(err =>{
                    console.log(err);
                });
                this.setState({isChanged:false});
    }


    scoringChangeHandler = (scoretype) => {
        this.setState({ scoringType: scoringTypes[scoretype] })
    }
    posChangeHandler = (posfiltertype) => {
        this.setState({ positionFilter: positionFilters[posfiltertype] })
    }


    movePlayerClickedHandler = (playerId, dir) => {
        let playerToChange = this.state.playerRankings.filter(player => player.playerToRank.playerId === playerId);
        let initialRanks;
        let allPlayersInPos;
        let otherPlayerToChange;
        let otherPlayersRanks;
        console.log(playerToChange);
        switch (this.state.scoringType) {
            case "standard":
                initialRanks = [playerToChange[0].playerRanking.playerRank, playerToChange[0].playerRanking.posRank];
                break;
            case "ppr":
                initialRanks = [playerToChange[0].playerRanking.pprRank, playerToChange[0].playerRanking.pprPosRank];
                break;
            case "dynasty":
                initialRanks = [playerToChange[0].playerRanking.dynastyRank, playerToChange[0].playerRanking.dynastyPosRank];
                break;
            default:
                initialRanks = [playerToChange[0].playerRanking.playerRank, playerToChange[0].playerRanking.posRank];
                break;
        }
        console.log(initialRanks);

        if (this.state.positionFilter === "ALL") {
            switch (this.state.scoringType) {
                case "standard":
                    otherPlayerToChange = this.state.playerRankings.filter(player => player.playerRanking.playerRank === (initialRanks[0] + dir));
                    otherPlayersRanks = [otherPlayerToChange[0].playerRanking.playerRank, otherPlayerToChange[0].playerRanking.posRank];
                    otherPlayerToChange[0].playerRanking.playerRank = initialRanks[0];
                    playerToChange[0].playerRanking.playerRank = otherPlayersRanks[0];
                    if (otherPlayerToChange[0].playerToRank.playerPos === playerToChange[0].playerToRank.playerPos) {
                        otherPlayerToChange[0].playerRanking.posRank = initialRanks[1];
                        playerToChange[0].playerRanking.posRank = otherPlayersRanks[1];
                    }
                    break;
                case "ppr":
                    otherPlayerToChange = this.state.playerRankings.filter(player => player.playerRanking.pprRank === (initialRanks[0] + dir));
                    otherPlayersRanks = [otherPlayerToChange[0].playerRanking.pprRank, otherPlayerToChange[0].playerRanking.pprPosRank];
                    otherPlayerToChange[0].playerRanking.pprRank = initialRanks[0];
                    playerToChange[0].playerRanking.pprRank = otherPlayersRanks[0];
                    if (otherPlayerToChange[0].playerToRank.playerPos === playerToChange[0].playerToRank.playerPos) {
                        otherPlayerToChange[0].playerRanking.pprPosRank = initialRanks[1];
                        playerToChange[0].playerRanking.pprPosRank = otherPlayersRanks[1];
                    }
                    break;
                case "dynasty":
                    otherPlayerToChange = this.state.playerRankings.filter(player => player.playerRanking.dynastyRank === (initialRanks[0] + dir));
                    otherPlayersRanks = [otherPlayerToChange[0].playerRanking.dynastyRank, otherPlayerToChange[0].playerRanking.dynastyPosRank];
                    otherPlayerToChange[0].playerRanking.dynastyRank = initialRanks[0];
                    playerToChange[0].playerRanking.dynastyRank = otherPlayersRanks[0];
                    if (otherPlayerToChange[0].playerToRank.playerPos === playerToChange[0].playerToRank.playerPos) {
                        otherPlayerToChange[0].playerRanking.dynastyPosRank = initialRanks[1];
                        playerToChange[0].playerRanking.dynastyPosRank = otherPlayersRanks[1];
                    }
                    break;
                default:
                    console.log("something went wrong!");
            }
        }
        if (this.state.positionFilter !== "ALL") {
            allPlayersInPos = this.state.playerRankings.filter(player => player.playerToRank.playerPos === this.state.positionFilter);
            switch (this.state.scoringType) {
                case "standard":
                    otherPlayerToChange = allPlayersInPos.filter(player => player.playerRanking.posRank === (initialRanks[1] + dir));
                    otherPlayersRanks = [otherPlayerToChange[0].playerRanking.playerRank, otherPlayerToChange[0].playerRanking.posRank];
                    otherPlayerToChange[0].playerRanking.playerRank = initialRanks[0];
                    playerToChange[0].playerRanking.playerRank = otherPlayersRanks[0];
                    otherPlayerToChange[0].playerRanking.posRank = initialRanks[1];
                    playerToChange[0].playerRanking.posRank = otherPlayersRanks[1];
                    break;
                case "ppr":
                    otherPlayerToChange = allPlayersInPos.filter(player => player.playerRanking.pprPosRank === (initialRanks[1] + dir));
                    otherPlayersRanks = [otherPlayerToChange[0].playerRanking.pprRank, otherPlayerToChange[0].playerRanking.pprPosRank];
                    otherPlayerToChange[0].playerRanking.pprRank = initialRanks[0];
                    playerToChange[0].playerRanking.pprRank = otherPlayersRanks[0];
                    otherPlayerToChange[0].playerRanking.pprPosRank = initialRanks[1];
                    playerToChange[0].playerRanking.pprPosRank = otherPlayersRanks[1];
                    break;
                case "dynasty":
                    otherPlayerToChange = allPlayersInPos.filter(player => player.playerRanking.dynastyPosRank === (initialRanks[1] + dir));
                    otherPlayersRanks = [otherPlayerToChange[0].playerRanking.dynastyRank, otherPlayerToChange[0].playerRanking.dynastyPosRank];
                    otherPlayerToChange[0].playerRanking.dynastyRank = initialRanks[0];
                    playerToChange[0].playerRanking.dynastyRank = otherPlayersRanks[0];
                    otherPlayerToChange[0].playerRanking.dynastyPosRank = initialRanks[1];
                    playerToChange[0].playerRanking.dynastyPosRank = otherPlayersRanks[1];
                    break;
                default:
                    console.log("something went wrong!");
            }
        }
         this.setState({playerToChange,otherPlayerToChange,isChanged:true})

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
                      
                    <RankingController 
                        scoringType = {this.state.scoringType}
                        positionFilter= {this.state.positionFilter}
                        saveRankingsHandler={this.saveRankingsHandler}
                        scoringChangeHandler={this.scoringChangeHandler}
                        positionChangeHandler={this.posChangeHandler}
                        isChanged ={this.state.isChanged}/>
                    <main>
                        <div className={Classes.playerHeader}>
                            <div></div>
                            <div className={Classes.center}>Player</div>
                            <div className={Classes.center}>Pos/Rank</div>
                            <div className={Classes.center}>Rank</div>
                            <div></div>
                        </div>
                        <hr className={Classes.divider}></hr>
                        <div className={Classes.playerRankingArea}>
                        <Players
                            playersToRank={this.state.playerRankings}
                            playerScoringType={this.state.scoringType}
                            playerPositionFilter={this.state.positionFilter}
                            movePlayerClicked={this.movePlayerClickedHandler} />
                            </div>
                    </main>
                </Aux>
            )
        }
    }
}


export default RankingManager;