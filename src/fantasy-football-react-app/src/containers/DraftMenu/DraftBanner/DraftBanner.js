import React from 'react';
import Aux from '../../../hoc/ReactAux';
import Classes from './DraftBanner.module.css';


const DraftBanner = (props) => {

    let scoreButton,
    bannerShow = Classes.hide,
    budgetShow = Classes.show,

    draftSlotShow = Classes.show;

    if (props.settingsOpen)
    {
        bannerShow = Classes.hide
    }
    else
    {
        bannerShow = Classes.draftBanner
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
            <div className={bannerShow}>
                <div className={Classes.draftDiv}>
                <div> {props.currentLeagueSettings.leagueType}</div>
                <div className={budgetShow}>Budget{props.currentLeagueSettings.startingBudget}</div>
                <div >Teams{props.currentLeagueSettings.leagueSize}</div>
                <div className={draftSlotShow}>Slot#{props.currentLeagueSettings.draftSlot}</div>
                <div>Players{props.currentLeagueSettings.totalPlayer}</div>
                <div >Qb{props.currentLeagueSettings.totalStartingQb}</div>
                <div >Rb{props.currentLeagueSettings.totalStartingRb}</div>
                <div >Wr{props.currentLeagueSettings.totalStartingWr}</div>
                <div >Te{props.currentLeagueSettings.totalStartingTe}</div>
                <div >Flex{props.currentLeagueSettings.totalStartingFlex}</div>
                <div >SFlex{props.currentLeagueSettings.totalStartingSFlex}</div>
                <div >DST{props.currentLeagueSettings.totalStartingD}</div>
                <div >K{props.currentLeagueSettings.totalStartingK}</div>        
                <div className={scoreButton} onClick ={openSettings}>
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
                </div>
            </div>
        </Aux>


    )



}

export default DraftBanner;