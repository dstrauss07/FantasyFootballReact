import React from 'react';
import Aux from '../../../hoc/ReactAux';
import CheatSheetPlayers from '../../../component/CheatSheetPlayers/CheatSheetPlayers';
import Classes from './CheatSheet.module.css';
import { tsPropertySignature } from '@babel/types';

const CheatSheet = (props) => {
    let draftDiv;
    let cheatSheetArea= Classes.cheatSheetArea;
    let formCheck = Classes.formCheck;
    let revertDivClass;
    let revertDiv;
    if(props.buttonDisabled)
    {
        cheatSheetArea = Classes.cheatSheetAreaDisabled;
        formCheck = Classes.formCheckDisabled;
        revertDivClass = Classes.hide;
    }

    switch (props.draftType) {
        case "snake":
            draftDiv = <div className={cheatSheetArea}>
                <div className={Classes.allPlayers}>
                    <h4>All Players</h4>
                    <CheatSheetPlayers
                        playersToRank={props.currentRankings}
                        selectedPlayers={props.draftSession.selectedPlayers}
                        playerScoringType={props.scoringType}
                        clicked={props.playerClicked}
                        playerPositionFilter="ALL"
                        filtered={props.playersFilters}
                        buttonDisabled={props.buttonDisabled}
                        draftType={props.draftType}
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
                        buttonDisabled={props.buttonDisabled}
                        draftType={props.draftType}
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
                        buttonDisabled={props.buttonDisabled}
                        draftType={props.draftType}
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
                        buttonDisabled={props.buttonDisabled}
                        draftType={props.draftType}
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
                        buttonDisabled={props.buttonDisabled}
                        draftType={props.draftType}
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
                        buttonDisabled={props.buttonDisabled}
                        draftType={props.draftType}
                    />
                    <h4>K</h4>
                    <CheatSheetPlayers
                        playersToRank={props.currentRankings}
                        selectedPlayers={props.draftSession.selectedPlayers}
                        playerScoringType={props.scoringType}
                        clicked={props.playerClicked}
                        playerPositionFilter="K"
                        filtered={props.playersFilters}
                        buttonDisabled={props.buttonDisabled}
                        draftType={props.draftType}
                    />
                </div>
            </div>

            break;


        case "auction":
            draftDiv = <div className={cheatSheetArea}>
                <div className={Classes.allPlayers}>
                    <h4>All Players</h4>
                    <CheatSheetPlayers
                        playersToRank={props.currentRankings}
                        selectedPlayers={props.draftSession.selectedPlayers}
                        playerScoringType={props.scoringType}
                        clicked={props.playerClicked}
                        playerPositionFilter="ALL"
                        filtered={props.playersFilters}
                        buttonDisabled={props.buttonDisabled}
                        draftType={props.draftType}
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
                        buttonDisabled={props.buttonDisabled}
                        draftType={props.draftType}
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
                        buttonDisabled={props.buttonDisabled}
                        draftType={props.draftType}
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
                        buttonDisabled={props.buttonDisabled}
                        draftType={props.draftType}
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
                        buttonDisabled={props.buttonDisabled}
                        draftType={props.draftType}
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
                        buttonDisabled={props.buttonDisabled}
                        draftType={props.draftType}
                    />
                    <h4>K</h4>
                    <CheatSheetPlayers
                        playersToRank={props.currentRankings}
                        selectedPlayers={props.draftSession.selectedPlayers}
                        playerScoringType={props.scoringType}
                        clicked={props.playerClicked}
                        playerPositionFilter="K"
                        filtered={props.playersFilters}
                        buttonDisabled={props.buttonDisabled}
                        draftType={props.draftType}
                    />
                </div>
            </div>

            break;
        default:
            draftDiv = <div>Unknown draft Type</div>
    }

        if (props.draftSession.currentPick >1) {
        revertDiv = <div><button
            onClick={props.revertPick}>Revert Pick</button></div>
    }
    else {
        revertDiv = <div></div>
    }

    return (
        <Aux>
            <div className={revertDivClass}>
                {revertDiv}
            </div>
             <div className={formCheck} >
             <label className={Classes.formCheckLabel} for="filterDrafted">Filter Drafted Players</label>
                    <input type="checkbox"
                        className={Classes.formCheckLabel} 
                        id="filterDrafted"
                        value={props.draftSession.playersFiltered}
                        onChange={props.filterDrafted} />
                </div>
            {draftDiv}
        </Aux>
    );
}


export default CheatSheet;

