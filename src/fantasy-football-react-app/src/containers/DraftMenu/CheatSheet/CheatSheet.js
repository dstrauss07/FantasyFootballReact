import React from 'react';
import Aux from '../../../hoc/Aux';
import CheatSheetPlayers from '../../../component/CheatSheetPlayers/CheatSheetPlayers';
import Classes from './CheatSheet.module.css';

const CheatSheet = (props) => {
    let draftDiv;

    switch (props.draftType) {
        case "Snake":
            draftDiv = <div className={Classes.cheatSheetArea}>
                <div className={Classes.allPlayers}>
                    <h4>All Players</h4>
                    <CheatSheetPlayers
                    playersToRank={props.currentRankings}
                    selectedPlayers= {props.draftSession.selectedPlayers}
                    playerScoringType={props.scoringType}
                    clicked = {props.playerClicked}
                    playerPositionFilter="ALL"
                />
                </div>
                <div>
                <h4>QB</h4>
                    <CheatSheetPlayers
                        playersToRank={props.currentRankings}
                        selectedPlayers= {props.draftSession.selectedPlayers}
                        playerScoringType={props.scoringType}
                        clicked = {props.playerClicked}
                        playerPositionFilter="QB"
                    />
                </div>
                <div>
                <h4>RB</h4>
                    <CheatSheetPlayers
                        playersToRank={props.currentRankings}
                        selectedPlayers= {props.draftSession.selectedPlayers}
                        playerScoringType={props.scoringType}
                        clicked = {props.playerClicked}
                        playerPositionFilter="RB"
                    />
                </div>
                <div>
                <h4>WR</h4>
                <CheatSheetPlayers
                    playersToRank={props.currentRankings}
                    selectedPlayers= {props.draftSession.selectedPlayers}
                    playerScoringType={props.scoringType}
                    clicked = {props.playerClicked}
                    playerPositionFilter="WR"
                />
                </div>
                <div>
                <h4>TE</h4>
                    <CheatSheetPlayers
                        playersToRank={props.currentRankings}
                        selectedPlayers= {props.draftSession.selectedPlayers}
                        playerScoringType={props.scoringType}
                        clicked = {props.playerClicked}
                        playerPositionFilter="TE"
                    />
                </div>
                <div>
                <h4>DST</h4>
                    <CheatSheetPlayers
                        playersToRank={props.currentRankings}
                        selectedPlayers= {props.draftSession.selectedPlayers}
                        playerScoringType={props.scoringType}
                        clicked = {props.playerClicked}
                        playerPositionFilter="DST"
                    />
                </div>
                <div>
                <h4>K</h4>
                    <CheatSheetPlayers
                        playersToRank={props.currentRankings}
                        selectedPlayers= {props.draftSession.selectedPlayers}
                        playerScoringType={props.scoringType}
                        clicked = {props.playerClicked}
                        playerPositionFilter="K"
                    />
                </div>
            </div>

            break;


        case "Auction":
                draftDiv = <div className={Classes.cheatSheetArea}>
                <div className={Classes.allPlayers}>
                    <h4>All Players</h4>
                    <CheatSheetPlayers
                    playersToRank={props.currentRankings}
                    selectedPlayers= {props.draftSession.selectedPlayers}
                    playerScoringType={props.scoringType}
                    playerPositionFilter="ALL"
                />
                </div>
                <div>
                <h4>QB</h4>
                    <CheatSheetPlayers
                        playersToRank={props.currentRankings}
                        selectedPlayers= {props.draftSession.selectedPlayers}
                        playerScoringType={props.scoringType}
                        playerPositionFilter="QB"
                    />
                </div>
                <div>
                <h4>RB</h4>
                    <CheatSheetPlayers
                        playersToRank={props.currentRankings}
                        selectedPlayers= {props.draftSession.selectedPlayers}
                        playerScoringType={props.scoringType}
                        playerPositionFilter="RB"
                    />
                </div>
                <div>
                <h4>WR</h4>
                <CheatSheetPlayers
                    playersToRank={props.currentRankings}
                    selectedPlayers= {props.draftSession.selectedPlayers}
                    playerScoringType={props.scoringType}
                    playerPositionFilter="WR"
                />
                </div>
                <div>
                <h4>TE</h4>
                    <CheatSheetPlayers
                        playersToRank={props.currentRankings}
                        selectedPlayers= {props.draftSession.selectedPlayers}
                        playerScoringType={props.scoringType}
                        playerPositionFilter="TE"
                    />
                </div>
                <div>
                <h4>DST</h4>
                    <CheatSheetPlayers
                        playersToRank={props.currentRankings}
                        selectedPlayers= {props.draftSession.selectedPlayers}
                        playerScoringType={props.scoringType}
                        playerPositionFilter="DST"
                    />
                </div>
                <div>
                <h4>K</h4>
                    <CheatSheetPlayers
                        playersToRank={props.currentRankings}
                        selectedPlayers= {props.draftSession.selectedPlayers}
                        playerScoringType={props.scoringType}
                        playerPositionFilter="K"
                    />
                </div>
            </div>

            break;
        default:
            draftDiv = <div>Unknown draft Type</div>
    }

    return (
        <Aux>
            <div>Cheat Sheet!</div>
            {draftDiv}
        </Aux>
    );
}


export default CheatSheet;

