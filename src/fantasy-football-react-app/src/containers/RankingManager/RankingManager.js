import React, { Component } from 'react';
import Aux from '../../hoc/ReactAux';
import Players from '../../component/Players/Players';
import axios from 'axios';
import Classes from './RankingManager.module.css';
import RankingMenu from './RankingMenu/RankingMenu';
// import { debuggerStatement } from '@babel/types';

const scoringTypes = ["standard", "ppr", "dynasty"];
const positionFilters = ["ALL", "QB", "RB", "WR", "TE", "DST", "K"]
const rankUri = 'https://localhost:44385/api/PlayerRanking/'

class RankingManager extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
        scoringType: scoringTypes[0],
        positionFilter: positionFilters[0],
        isChanged: false,
    };

}

    saveRankingsHandler = () => {

        let playerRankingsToUpdate = [];
        let currentPlayerRanking;
        let playerRank;
        if (this.props.currentUser != null) {
            for (playerRank in this.props.playerRankings) {
                currentPlayerRanking = this.props.playerRankings[playerRank];
                playerRankingsToUpdate.push(currentPlayerRanking);
            }
            axios.patch(rankUri, playerRankingsToUpdate)
                .then(response => {

                })
                .catch(err => {
                    console.log(err);
                });
            this.setState({ isChanged: false });
        }
        else {
            this.props.goToLogin(3)
        }
    }


    scoringChangeHandler = (scoretype) => {
        this.setState({ scoringType: scoringTypes[scoretype] })
    }
    posChangeHandler = (posfiltertype) => {
        this.setState({ positionFilter: positionFilters[posfiltertype] })
    }


    movePlayerClickedHandler = (playerId, dir, top, bottom) => {
        let playerToChange = this.props.playerRankings.filter(player => player.playerToRank.playerId === playerId);
        let initialRanks;
        let otherPlayerToChange;
        let otherPlayersToChange;
        let otherPlayersRanks;
        let allPlayers = this.props.playerRankings;
        let allPlayersInPos = this.props.playerRankings.filter(player => player.playerToRank.playerPos === this.state.positionFilter);
        switch (this.state.scoringType) {
            case "standard":
                initialRanks = [playerToChange[0].playerRanking.playerRank, playerToChange[0].playerRanking.posRank];
                allPlayers = allPlayers.sort(function(a,b){
                    if (a.playerRanking.playerRank > b.playerRanking.playerRank) {
                        return 1;
                    }
                    else {
                        return -1;
                    }
                })
                allPlayersInPos = allPlayersInPos.sort(function (a, b) {
                    if (a.playerRanking.playerRank > b.playerRanking.playerRank) {
                        return 1;
                    }
                    else {
                        return -1;
                    }
                })
                break;
            case "ppr":
                initialRanks = [playerToChange[0].playerRanking.pprRank, playerToChange[0].playerRanking.pprPosRank];
                allPlayers = allPlayers.sort(function(a,b){
                    if (a.playerRanking.pprRank > b.playerRanking.pprRank) {
                        return 1;
                    }
                    else {
                        return -1;
                    }
                })
                allPlayersInPos = allPlayersInPos.sort(function (a, b) {
                    if (a.playerRanking.pprRank > b.playerRanking.pprRank) {
                        return 1;
                    }
                    else {
                        return -1;
                    }
                })
                break;
            case "dynasty":
                initialRanks = [playerToChange[0].playerRanking.dynastyRank, playerToChange[0].playerRanking.dynastyPosRank];
                allPlayers = allPlayers.sort(function(a,b){
                    if (a.playerRanking.dynastyRank > b.playerRanking.dynastyRank) {
                        return 1;
                    }
                    else {
                        return -1;
                    }
                })
                allPlayersInPos = allPlayersInPos.sort(function (a, b) {
                    if (a.playerRanking.dynastyRank > b.playerRanking.dynastyRank) {
                        return 1;
                    }
                    else {
                        return -1;
                    }
                })
                break;
            default:
                initialRanks = [playerToChange[0].playerRanking.playerRank, playerToChange[0].playerRanking.posRank];
                allPlayersInPos = allPlayersInPos.sort(function (a, b) {
                    if (a.playerRanking.playerRank > b.playerRanking.playerRank) {
                        return 1;
                    }
                    else {
                        return -1;
                    }
                })
                break;
        }


        if (!top && !bottom) {
            if (this.state.positionFilter === "ALL") {
                switch (this.state.scoringType) {
                    case "standard":
                        otherPlayerToChange = allPlayers.filter(player => player.playerRanking.playerRank === (initialRanks[0] + dir));
                        otherPlayersRanks = [otherPlayerToChange[0].playerRanking.playerRank, otherPlayerToChange[0].playerRanking.posRank];
                        otherPlayerToChange[0].playerRanking.playerRank = initialRanks[0];
                        playerToChange[0].playerRanking.playerRank = otherPlayersRanks[0];
                        if (otherPlayerToChange[0].playerToRank.playerPos === playerToChange[0].playerToRank.playerPos) {
                            otherPlayerToChange[0].playerRanking.posRank = initialRanks[1];
                            playerToChange[0].playerRanking.posRank = otherPlayersRanks[1];
                        }
                        break;
                    case "ppr":
                        otherPlayerToChange = allPlayers.filter(player => player.playerRanking.pprRank === (initialRanks[0] + dir));
                        otherPlayersRanks = [otherPlayerToChange[0].playerRanking.pprRank, otherPlayerToChange[0].playerRanking.pprPosRank];
                        otherPlayerToChange[0].playerRanking.pprRank = initialRanks[0];
                        playerToChange[0].playerRanking.pprRank = otherPlayersRanks[0];
                        if (otherPlayerToChange[0].playerToRank.playerPos === playerToChange[0].playerToRank.playerPos) {
                            otherPlayerToChange[0].playerRanking.pprPosRank = initialRanks[1];
                            playerToChange[0].playerRanking.pprPosRank = otherPlayersRanks[1];
                        }
                        break;
                    case "dynasty":
                        otherPlayerToChange = allPlayers.filter(player => player.playerRanking.dynastyRank === (initialRanks[0] + dir));
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
            this.setState({ playerToChange, otherPlayerToChange, isChanged: true })
        }
        if (top) {
            switch (this.state.scoringType) {
                case "standard":
                    {
                        if (this.state.positionFilter === "ALL") {
                            otherPlayersToChange = allPlayers.filter(player => player.playerRanking.playerRank < (initialRanks[0]));
                            playerToChange[0].playerRanking.playerRank = 1;
                            playerToChange[0].playerRanking.posRank = 1;
                            console.log(playerToChange[0]);
                            this.setState({ playerToChange, isChanged: true });
                            for (var p = 0; p < otherPlayersToChange.length; p++) {
                                otherPlayersToChange[p].playerRanking.playerRank += 1;
                                if (otherPlayersToChange[p].playerToRank.playerPos === playerToChange[0].playerToRank.playerPos) {
                                    otherPlayersToChange[p].playerRanking.posRank += 1
                                }
                                otherPlayerToChange = otherPlayersToChange[p];
                                this.setState({ otherPlayerToChange, isChanged: true });
                            }
                        }
                        else {
                            otherPlayersToChange = allPlayersInPos.filter(player => player.playerRanking.playerRank < (initialRanks[0]));
                            playerToChange[0].playerRanking.posRank = 1;
                            playerToChange[0].playerRanking.playerRank = otherPlayersToChange[0].playerRanking.playerRank;
                            this.setState({ playerToChange, isChanged: true });
                            for (var p = 0; p < otherPlayersToChange.length; p++) {
                                if (p < otherPlayersToChange.length - 1) {
                                    otherPlayersToChange[p].playerRanking.playerRank = otherPlayersToChange[p + 1].playerRanking.playerRank;
                                }
                                else {
                                    otherPlayersToChange[p].playerRanking.playerRank = initialRanks[0];
                                }
                                otherPlayersToChange[p].playerRanking.posRank += 1
                                otherPlayerToChange = otherPlayersToChange[p];
                                this.setState({ playerToChange, isChanged: true });
                            }
                        }
                        break;
                    }
                case "ppr":
                    {
                        if (this.state.positionFilter === "ALL") {
                            otherPlayersToChange = allPlayers.filter(player => player.playerRanking.pprRank < (initialRanks[0]));
                            playerToChange[0].playerRanking.pprRank = 1;
                            playerToChange[0].playerRanking.pprPosRank = 1;
                            console.log(playerToChange[0]);
                            this.setState({ playerToChange, isChanged: true });
                            for (var p = 0; p < otherPlayersToChange.length; p++) {
                                otherPlayersToChange[p].playerRanking.pprRank += 1;
                                if (otherPlayersToChange[p].playerToRank.playerPos === playerToChange[0].playerToRank.playerPos) {
                                    otherPlayersToChange[p].playerRanking.pprPosRank += 1
                                }
                                otherPlayerToChange = otherPlayersToChange[p];
                                this.setState({ playerToChange, isChanged: true });
                            }
                        }
                        else {
                            otherPlayersToChange = allPlayersInPos.filter(player => player.playerRanking.pprRank < (initialRanks[0]));
                            playerToChange[0].playerRanking.pprPosRank = 1;
                            playerToChange[0].playerRanking.pprRank = otherPlayersToChange[0].playerRanking.pprRank;
                            this.setState({ playerToChange, isChanged: true });
                            for (var p = 0; p < otherPlayersToChange.length; p++) {
                                if (p < otherPlayersToChange.length - 1) {
                                    otherPlayersToChange[p].playerRanking.pprRank = otherPlayersToChange[p + 1].playerRanking.pprRank;
                                }
                                else {
                                    otherPlayersToChange[p].playerRanking.pprRank = initialRanks[0];
                                }
                                otherPlayersToChange[p].playerRanking.pprPosRank += 1
                                otherPlayerToChange = otherPlayersToChange[p];
                                this.setState({ otherPlayerToChange, isChanged: true });
                            }
                        }
                        break;
                    }
                case "dynasty":
                    {
                        if (this.state.positionFilter === "ALL") {
                            otherPlayersToChange = allPlayers.filter(player => player.playerRanking.dynastyRank < (initialRanks[0]));
                            playerToChange[0].playerRanking.dynastyRank = 1;
                            playerToChange[0].playerRanking.dynastyPosRank = 1;
                            console.log(playerToChange[0]);
                            this.setState({ playerToChange, isChanged: true });
                            for (var p = 0; p < otherPlayersToChange.length; p++) {
                                otherPlayersToChange[p].playerRanking.dynastyRank += 1;
                                if (otherPlayersToChange[p].playerToRank.playerPos === playerToChange[0].playerToRank.playerPos) {
                                    otherPlayersToChange[p].playerRanking.dynastyPosRank += 1
                                }
                                otherPlayerToChange = otherPlayersToChange[p];
                                this.setState({ playerToChange, isChanged: true });
                            }
                        }
                        else {
                            otherPlayersToChange = allPlayersInPos.filter(player => player.playerRanking.dynastyRank < (initialRanks[0]));
                            console.log(otherPlayersToChange);
                            playerToChange[0].playerRanking.dynastyPosRank = 1;
                            playerToChange[0].playerRanking.dynastyRank = otherPlayersToChange[0].playerRanking.dynastyRank;
                            this.setState({ playerToChange, isChanged: true });
                            for (var p = 0; p < otherPlayersToChange.length; p++) {
                                if (p < otherPlayersToChange.length - 1) {
                                    otherPlayersToChange[p].playerRanking.dynastyRank = otherPlayersToChange[p + 1].playerRanking.dynastyRank;
                                }
                                else {
                                    otherPlayersToChange[p].playerRanking.dynastyRank = initialRanks[0];
                                }
                                otherPlayersToChange[p].playerRanking.dynastyPosRank += 1
                                otherPlayerToChange = otherPlayersToChange[p];
                                this.setState({ otherPlayerToChange, isChanged: true });
                            }
                        }
                        break;
                    }
                default:
                    {
                        if (this.state.positionFilter === "ALL") {
                            otherPlayersToChange = allPlayers.filter(player => player.playerRanking.playerRank < (initialRanks[0]));
                            playerToChange[0].playerRanking.playerRank = 1;
                            playerToChange[0].playerRanking.posRank = 1;
                            console.log(playerToChange[0]);
                            this.setState({ playerToChange, isChanged: true });
                            for (var p = 0; p < otherPlayersToChange.length; p++) {
                                otherPlayersToChange[p].playerRanking.playerRank += 1;
                                if (otherPlayersToChange[p].playerToRank.playerPos === playerToChange[0].playerToRank.playerPos) {
                                    otherPlayersToChange[p].playerRanking.posRank += 1
                                }
                                otherPlayerToChange = otherPlayersToChange[p];
                                this.setState({ otherPlayerToChange, isChanged: true });
                            }
                        }
                        else {
                            otherPlayersToChange = allPlayersInPos.filter(player => player.playerRanking.playerRank < (initialRanks[0]));
                            playerToChange[0].playerRanking.posRank = 1;
                            playerToChange[0].playerRanking.playerRank = otherPlayersToChange[0].playerRanking.playerRank;
                            this.setState({ playerToChange, isChanged: true });
                            for (var p = 0; p < otherPlayersToChange.length; p++) {
                                if (p < otherPlayersToChange.length - 1) {
                                    otherPlayersToChange[p].playerRanking.playerRank = otherPlayersToChange[p + 1].playerRanking.playerRank;
                                }
                                else {
                                    otherPlayersToChange[p].playerRanking.playerRank = initialRanks[0];
                                }
                                otherPlayersToChange[p].playerRanking.posRank += 1
                                otherPlayerToChange = otherPlayersToChange[p];
                                this.setState({ playerToChange, isChanged: true });
                            }
                        }
                        break;
                    }

            }
        }
        if (bottom) {
            switch (this.state.scoringType) {
                case "standard":
                    {
                        if (this.state.positionFilter === "ALL") {
                            otherPlayersToChange = allPlayers.filter(player => player.playerRanking.playerRank > (initialRanks[0]));
                            console.log(otherPlayersToChange);
                            playerToChange[0].playerRanking.playerRank = otherPlayersToChange[otherPlayersToChange.length-1].playerRanking.playerRank;
                            playerToChange[0].playerRanking.posRank = otherPlayersToChange[otherPlayersToChange.length-1].playerRanking.posRank;
                            console.log(playerToChange[0]);
                            this.setState({ playerToChange, isChanged: true });
                            for (var p = 0; p < otherPlayersToChange.length; p++) {
                                otherPlayersToChange[p].playerRanking.playerRank -= 1;
                                if (otherPlayersToChange[p].playerToRank.playerPos === playerToChange[0].playerToRank.playerPos) {
                                    otherPlayersToChange[p].playerRanking.posRank -= 1
                                }
                                otherPlayerToChange = otherPlayersToChange[p];
                                this.setState({ otherPlayerToChange, isChanged: true });
                            }
                        }
                        else {
                            otherPlayersToChange = allPlayersInPos.filter(player => player.playerRanking.playerRank > (initialRanks[0]));
                            playerToChange[0].playerRanking.playerRank = otherPlayersToChange[otherPlayersToChange.length-1].playerRanking.playerRank;
                            playerToChange[0].playerRanking.posRank = otherPlayersToChange[otherPlayersToChange.length-1].playerRanking.posRank;
                            this.setState({ playerToChange, isChanged: true });
                            for (var p = otherPlayersToChange.length-1; p >= 0; p--) {
                                if (p ===0) {
                                    otherPlayersToChange[p].playerRanking.playerRank = initialRanks[0];
                                }
                                else {
                                    otherPlayersToChange[p].playerRanking.playerRank = otherPlayersToChange[p - 1].playerRanking.playerRank;
                                }
                                otherPlayersToChange[p].playerRanking.posRank -= 1
                                otherPlayerToChange = otherPlayersToChange[p];
                                this.setState({ otherPlayerToChange, isChanged: true });
                            }
                        }
                        break;
                    }
                case "ppr":
                    {
                        if (this.state.positionFilter === "ALL") {
                            otherPlayersToChange = allPlayers.filter(player => player.playerRanking.pprRank > (initialRanks[0]));
                            console.log(otherPlayersToChange[otherPlayersToChange.length-1]);
                            playerToChange[0].playerRanking.pprRank = otherPlayersToChange[otherPlayersToChange.length-1].playerRanking.pprRank;
                            playerToChange[0].playerRanking.pprPosRank = otherPlayersToChange[otherPlayersToChange.length-1].playerRanking.pprPosRank;
                            this.setState({ playerToChange, isChanged: true });
                            for (var p = 0; p < otherPlayersToChange.length; p++) {
                                otherPlayersToChange[p].playerRanking.pprRank -= 1;
                                if (otherPlayersToChange[p].playerToRank.playerPos === playerToChange[0].playerToRank.playerPos) {
                                    otherPlayersToChange[p].playerRanking.pprPosRank -= 1
                                }
                                otherPlayerToChange = otherPlayersToChange[p];
                                this.setState({ otherPlayerToChange, isChanged: true });
                            }
                        }
                        else {
                            otherPlayersToChange = allPlayersInPos.filter(player => player.playerRanking.pprRank > (initialRanks[0]));
                            playerToChange[0].playerRanking.pprRank = otherPlayersToChange[otherPlayersToChange.length-1].playerRanking.pprRank;
                            playerToChange[0].playerRanking.pprPosRank = otherPlayersToChange[otherPlayersToChange.length-1].playerRanking.pprPosRank;
                            this.setState({ playerToChange, isChanged: true });
                            for (var p = otherPlayersToChange.length-1; p >= 0; p--) {
                                if (p ===0) {
                                    otherPlayersToChange[p].playerRanking.pprRank = initialRanks[0];
                                }
                                else {
                                    otherPlayersToChange[p].playerRanking.pprRank = otherPlayersToChange[p - 1].playerRanking.pprRank;
                                }
                                otherPlayersToChange[p].playerRanking.pprPosRank -= 1
                                otherPlayerToChange = otherPlayersToChange[p];
                                this.setState({ otherPlayerToChange, isChanged: true });
                            }
                        }
                        break;
                    }
                case "dynasty":
                    {
                        if (this.state.positionFilter === "ALL") {
                            otherPlayersToChange = allPlayers.filter(player => player.playerRanking.dynastyRank > (initialRanks[0]));
                            playerToChange[0].playerRanking.dynastyRank = otherPlayersToChange[otherPlayersToChange.length-1].playerRanking.dynastyRank;
                            playerToChange[0].playerRanking.dynastyPosRank = otherPlayersToChange[otherPlayersToChange.length-1].playerRanking.dynastyPosRank;
                            this.setState({ playerToChange, isChanged: true });
                            for (var p = 0; p < otherPlayersToChange.length; p++) {
                                otherPlayersToChange[p].playerRanking.dynastyRank -= 1;
                                if (otherPlayersToChange[p].playerToRank.playerPos === playerToChange[0].playerToRank.playerPos) {
                                    otherPlayersToChange[p].playerRanking.dynastyPosRank -= 1
                                }
                                otherPlayerToChange = otherPlayersToChange[p];
                                this.setState({ otherPlayerToChange, isChanged: true });
                            }
                        }
                        else {
                            otherPlayersToChange = allPlayersInPos.filter(player => player.playerRanking.dynastyRank > (initialRanks[0]));
                            playerToChange[0].playerRanking.dynastyRank = otherPlayersToChange[otherPlayersToChange.length-1].playerRanking.dynastyRank;
                            playerToChange[0].playerRanking.dynastyPosRank = otherPlayersToChange[otherPlayersToChange.length-1].playerRanking.dynastyPosRank;
                            this.setState({ playerToChange, isChanged: true });
                            for (var p = otherPlayersToChange.length-1; p >= 0; p--) {
                                if (p ===0) {
                                    otherPlayersToChange[p].playerRanking.dynastyRank = initialRanks[0];
                                }
                                else {
                                    otherPlayersToChange[p].playerRanking.dynastyRank = otherPlayersToChange[p - 1].playerRanking.dynastyRank;
                                }
                                otherPlayersToChange[p].playerRanking.dynastyPosRank -= 1
                                otherPlayerToChange = otherPlayersToChange[p];
                                this.setState({ otherPlayerToChange, isChanged: true });
                            }
                        }
                        break;
                    }
                default:
                    {
                        if (this.state.positionFilter === "ALL") {
                            otherPlayersToChange = this.state.playerRankings.filter(player => player.playerRanking.playerRank > (initialRanks[0]));
                            console.log(otherPlayersToChange);
                            playerToChange[0].playerRanking.playerRank = otherPlayersToChange[otherPlayersToChange.length-1].playerRanking.playerRank;
                            playerToChange[0].playerRanking.posRank = otherPlayersToChange[otherPlayersToChange.length-1].playerRanking.posRank;
                            console.log(playerToChange[0]);
                            this.setState({ playerToChange, isChanged: true });
                            for (var p = 0; p < otherPlayersToChange.length; p++) {
                                otherPlayersToChange[p].playerRanking.playerRank -= 1;
                                if (otherPlayersToChange[p].playerToRank.playerPos === playerToChange[0].playerToRank.playerPos) {
                                    otherPlayersToChange[p].playerRanking.posRank -= 1
                                }
                                otherPlayerToChange = otherPlayersToChange[p];
                                this.setState({ otherPlayerToChange, isChanged: true });
                            }
                        }
                        else {
                            otherPlayersToChange = allPlayersInPos.filter(player => player.playerRanking.playerRank > (initialRanks[0]));
                            playerToChange[0].playerRanking.playerRank = otherPlayersToChange[otherPlayersToChange.length-1].playerRanking.playerRank;
                            playerToChange[0].playerRanking.posRank = otherPlayersToChange[otherPlayersToChange.length-1].playerRanking.posRank;
                            this.setState({ playerToChange, isChanged: true });
                            for (var p = otherPlayersToChange.length-1; p >= 0; p--) {
                                if (p ===0) {
                                    otherPlayersToChange[p].playerRanking.playerRank = initialRanks[0];
                                }
                                else {
                                    otherPlayersToChange[p].playerRanking.playerRank = otherPlayersToChange[p - 1].playerRanking.playerRank;
                                }
                                otherPlayersToChange[p].playerRanking.posRank -= 1
                                otherPlayerToChange = otherPlayersToChange[p];
                                this.setState({ otherPlayerToChange, isChanged: true });
                            }
                        }
                        }
                        break;
                    }

            }
        }

    



    render() {

        console.log(this.props);

        if (this.props.isLoading) {
            console.log("loading");
            return (
                <h3>Loading...</h3>
            )
        }

        if (!this.props.isLoading) {
            console.log("loaded");
            return (
                <Aux>

                    <RankingMenu
                        scoringType={this.state.scoringType}
                        positionFilter={this.state.positionFilter}
                        saveRankingsHandler={this.saveRankingsHandler}
                        scoringChangeHandler={this.scoringChangeHandler}
                        positionChangeHandler={this.posChangeHandler}
                        isChanged={this.state.isChanged} />
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
                                playersToRank={this.props.playerRankings}
                                playerScoringType={this.state.scoringType}
                                playerPositionFilter={this.state.positionFilter}
                                movePlayerClicked={this.movePlayerClickedHandler}
                                playerTop={this.PlayerTopHandler}
                                playerBottom={this.PlayerBottomHandler}
                            />
                        </div>
                    </main>
                </Aux>
            )
        }
    }
}


export default RankingManager;