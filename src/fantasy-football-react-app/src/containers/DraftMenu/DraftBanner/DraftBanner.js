import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import DraftMenu from '../DraftMenu';
import Classes from './DraftBanner.module.css';


const DraftBanner = (props) => {

    let scoreButton,
    budgetShow = Classes.show,
    draftSlotShow = Classes.show;

    if (props.settingsOpen)
    {
        scoreButton = Classes.hide
    }
    else
    {
        scoreButton = Classes.show
    }

    if(props.currentLeagueSettings.startingBudget == null)
    {
        budgetShow= Classes.hide;
    }

    if(props.currentLeagueSettings.draftSlot == null)
    {
        draftSlotShow= Classes.hide;
    }
    

   const openSettings = (e) =>{
        e.preventDefault();
        props.toggleSettings();
    }

    return (
        <Aux>
            <div className={Classes.draftBanner}>
                <div className={budgetShow}>Budget <br /> {props.currentLeagueSettings.startingBudget}</div>
                <div className={draftSlotShow}>Draft Slot <br /> {props.currentLeagueSettings.draftSlot}</div>
                <div >Size <br /> {props.currentLeagueSettings.leagueSize}</div>
                <div >Qb <br /> {props.currentLeagueSettings.totalStartingQb}</div>
                <div >Rb <br /> {props.currentLeagueSettings.totalStartingRb}</div>
                <div >Wr <br /> {props.currentLeagueSettings.totalStartingWr}</div>
                <div >Te<br /> {props.currentLeagueSettings.totalStartingTe}</div>
                <div >Flex <br /> {props.currentLeagueSettings.totalStartingFlex}</div>
                <div >SFlex <br /> {props.currentLeagueSettings.totalStartingSFlex}</div>
                <div >DST <br /> {props.currentLeagueSettings.totalStartingD}</div>
                <div >K <br /> {props.currentLeagueSettings.totalStartingK}</div>
                <div>Players <br />  {props.currentLeagueSettings.totalPlayer}</div>
                <div>Scoring<br /> {props.currentLeagueSettings.leagueType}</div>
                <div className={scoreButton} onClick ={openSettings}>
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
            </div>
        </Aux>


    )



}

export default DraftBanner;