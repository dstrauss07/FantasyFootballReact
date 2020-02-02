import React from 'react';
import Aux from '../../../../hoc/ReactAux';
import Classes from './DraftBanner.module.css';


const DraftBanner = (props) => {

    let scoreButton,
        bannerShow = Classes.hide,
        budgetShow = Classes.show,
        draftSlotShow = Classes.show;

    const benchNum = props.currentLeagueSettings.totalPlayer - props.currentLeagueSettings.totalStartingQb - props.currentLeagueSettings.totalStartingRb - props.currentLeagueSettings.totalStartingWr - props.currentLeagueSettings.totalStartingTe - props.currentLeagueSettings.totalStartingFlex - props.currentLeagueSettings.totalStartingSFlex - props.currentLeagueSettings.totalStartingD - props.currentLeagueSettings.totalStartingK;

    let myPlayerCount, qbCount, rbCount, wrCount, teCount, flexCount, sFlexCount, dCount, kCount;
    let myTeam;
    let selectedPlayers = props.draftSession.selectedPlayers;
    const allTeams = props.draftSession.allTeams;
    const draftSlot = props.currentLeagueSettings.draftSlot;

    if (selectedPlayers.length < draftSlot 
        // && selectedPlayers.length>0 
        ) {
        myPlayerCount = 0;
        qbCount = 0;
        rbCount = 0;
        wrCount = 0;
        teCount = 0;
        flexCount = 0;
        sFlexCount = 0;
        dCount = 0;
        kCount = 0;
    }
    else {

        myTeam = allTeams[draftSlot - 1].draftedPlayer;
        myPlayerCount = myTeam.length;
        qbCount = myTeam.filter(p => p.playerToRank.playerPos === 'QB').length;
        rbCount = myTeam.filter(p => p.playerToRank.playerPos === 'RB').length;
        wrCount = myTeam.filter(p => p.playerToRank.playerPos === 'WR').length;
        teCount = myTeam.filter(p => p.playerToRank.playerPos === 'TE').length;
        flexCount = myTeam.filter(p => p.playerToRank.playerPos === 'FLEX').length;
        sFlexCount = myTeam.filter(p => p.playerToRank.playerPos === 'SFLEX').length;
        dCount = myTeam.filter(p => p.playerToRank.playerPos === 'DST').length;
        kCount = myTeam.filter(p => p.playerToRank.playerPos === 'K').length;
    }

    // let myTeam = allTeams[draftSlot];

    const leagueType = String(props.currentLeagueSettings.leagueType).toUpperCase();

    if (props.settingsOpen) {
        bannerShow = Classes.hide
    }
    else {
        bannerShow = Classes.draftBanner
    }


    if (props.draftType === 'auction') {
        budgetShow = Classes.show
    }
    else
    {
        budgetShow = Classes.hide
    }

    let budgetRemaining = props.draftSession.myTeam.budgetRemaining;



    const openSettings = (e) => {
        e.preventDefault();
        props.toggleSettings();
    }

    return (
        <Aux>
            <div className={bannerShow}>
                <div className={Classes.draftDiv}>
                    <div>{leagueType} LEAGUE</div>
                    <div className={budgetShow}> Budget<br/> ${props.draftSession.myTeam.budgetRemaining} of ${props.currentLeagueSettings.startingBudget} </div>
                    <div >Slot# <br/> {draftSlot} of  {props.currentLeagueSettings.leagueSize} </div>
                    <div>Drafted <br/>{myPlayerCount} of {props.currentLeagueSettings.totalPlayer}</div>
                    <div > QB <br/>{qbCount} of {props.currentLeagueSettings.totalStartingQb}</div>
                    <div >Rb <br/> {rbCount} of {props.currentLeagueSettings.totalStartingRb}</div>
                    <div >WR <br/> {wrCount} of {props.currentLeagueSettings.totalStartingWr}</div>
                    <div >TE <br/> {teCount} of {props.currentLeagueSettings.totalStartingTe}</div>
                    <div >Flex <br/>{flexCount} of{props.currentLeagueSettings.totalStartingFlex}</div>
                    <div >SFlex <br/> {sFlexCount} of {props.currentLeagueSettings.totalStartingSFlex}</div>
                    <div >DST <br/> {dCount} of {props.currentLeagueSettings.totalStartingD}</div>
                    <div >K <br/> {kCount} of
                    {props.currentLeagueSettings.totalStartingK}</div>
                    <div>Bench <br/> {benchNum}</div>
                    <div className={scoreButton} onClick={openSettings}>
                        <p></p>
                        <p></p>
                    </div>
                </div>
            </div>
        </Aux>


    )



}

export default DraftBanner;