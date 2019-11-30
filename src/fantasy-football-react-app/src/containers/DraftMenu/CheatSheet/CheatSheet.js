import React from 'react';
import Aux from '../../../hoc/ReactAux';
import CheatSheetPlayers from '../../../component/CheatSheetPlayers/CheatSheetPlayers';
import Classes from './CheatSheet.module.css';
import { tsPropertySignature } from '@babel/types';

const CheatSheet = (props) => {
    let draftDiv;
    switch (props.draftType) {
        case "snake":
            draftDiv = <div className={Classes.cheatSheetArea}>
                <div className={Classes.allPlayers}>
                    <h4>All Players</h4>
                    <CheatSheetPlayers
                        playersToRank={props.currentRankings}
                        selectedPlayers={props.draftSession.selectedPlayers}
                        playerScoringType={props.scoringType}
                        clicked={props.playerClicked}
                        playerPositionFilter="ALL"
                        filtered={props.playersFilters}
                    />
                </div>
                <div>
                    <h4>QB</h4>
                    <CheatSheetPlayers
                        playersToRank={props.currentRankings}
                        selectedPlayers={props.draftSession.selectedPlayers}
                        playerScoringType={props.scoringType}
                        clicked={props.playerClicked}
                        playerPositionFilter="QB"
                        filtered={props.playersFilters}
                    />
                </div>
                <div>
                    <h4>RB</h4>
                    <CheatSheetPlayers
                        playersToRank={props.currentRankings}
                        selectedPlayers={props.draftSession.selectedPlayers}
                        playerScoringType={props.scoringType}
                        clicked={props.playerClicked}
                        playerPositionFilter="RB"
                        filtered={props.playersFilters}
                    />
                </div>
                <div>
                    <h4>WR</h4>
                    <CheatSheetPlayers
                        playersToRank={props.currentRankings}
                        selectedPlayers={props.draftSession.selectedPlayers}
                        playerScoringType={props.scoringType}
                        clicked={props.playerClicked}
                        playerPositionFilter="WR"
                        filtered={props.playersFilters}
                    />
                </div>
                <div>
                    <h4>TE</h4>
                    <CheatSheetPlayers
                        playersToRank={props.currentRankings}
                        selectedPlayers={props.draftSession.selectedPlayers}
                        playerScoringType={props.scoringType}
                        clicked={props.playerClicked}
                        playerPositionFilter="TE"
                        filtered={props.playersFilters}
                    />
                </div>
                <div>
                    <h4>DST</h4>
                    <CheatSheetPlayers
                        playersToRank={props.currentRankings}
                        selectedPlayers={props.draftSession.selectedPlayers}
                        playerScoringType={props.scoringType}
                        clicked={props.playerClicked}
                        playerPositionFilter="DST"
                        filtered={props.playersFilters}
                    />
                </div>
                <div>
                    <h4>K</h4>
                    <CheatSheetPlayers
                        playersToRank={props.currentRankings}
                        selectedPlayers={props.draftSession.selectedPlayers}
                        playerScoringType={props.scoringType}
                        clicked={props.playerClicked}
                        playerPositionFilter="K"
                        filtered={props.playersFilters}
                    />
                </div>
            </div>

            break;


        case "auction":
            draftDiv = <div className={Classes.cheatSheetArea}>
                <div className={Classes.allPlayers}>
                    <h4>All Players</h4>
                    <CheatSheetPlayers
                        playersToRank={props.currentRankings}
                        selectedPlayers={props.draftSession.selectedPlayers}
                        playerScoringType={props.scoringType}
                        playerPositionFilter="ALL"
                        filtered={props.playersFilters}
                    />
                </div>
                <div>
                    <h4>QB</h4>
                    <CheatSheetPlayers
                        playersToRank={props.currentRankings}
                        selectedPlayers={props.draftSession.selectedPlayers}
                        playerScoringType={props.scoringType}
                        playerPositionFilter="QB"
                        filtered={props.playersFilters}
                    />
                </div>
                <div>
                    <h4>RB</h4>
                    <CheatSheetPlayers
                        playersToRank={props.currentRankings}
                        selectedPlayers={props.draftSession.selectedPlayers}
                        playerScoringType={props.scoringType}
                        playerPositionFilter="RB"
                        filtered={props.playersFilters}
                    />
                </div>
                <div>
                    <h4>WR</h4>
                    <CheatSheetPlayers
                        playersToRank={props.currentRankings}
                        selectedPlayers={props.draftSession.selectedPlayers}
                        playerScoringType={props.scoringType}
                        playerPositionFilter="WR"
                        filtered={props.playersFilters}
                    />
                </div>
                <div>
                    <h4>TE</h4>
                    <CheatSheetPlayers
                        playersToRank={props.currentRankings}
                        selectedPlayers={props.draftSession.selectedPlayers}
                        playerScoringType={props.scoringType}
                        playerPositionFilter="TE"
                        filtered={props.playersFilters}
                    />
                </div>
                <div>
                    <h4>DST</h4>
                    <CheatSheetPlayers
                        playersToRank={props.currentRankings}
                        selectedPlayers={props.draftSession.selectedPlayers}
                        playerScoringType={props.scoringType}
                        playerPositionFilter="DST"
                        filtered={props.playersFilters}
                    />
                </div>
                <div>
                    <h4>K</h4>
                    <CheatSheetPlayers
                        playersToRank={props.currentRankings}
                        selectedPlayers={props.draftSession.selectedPlayers}
                        playerScoringType={props.scoringType}
                        playerPositionFilter="K"
                        filtered={props.playersFilters}
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
                <div class="form-check" >
                    <input type="checkbox"
                        class="form-check-input"
                        id="filterDrafted"
                        value={props.draftSession.playersFiltered}
                        onChange={props.filterDrafted} />
                    <label class="form-check-label" for="filterDrafted">Filter Drafted Players</label>
                </div>
            {draftDiv}
        </Aux>
    );
}


export default CheatSheet;

