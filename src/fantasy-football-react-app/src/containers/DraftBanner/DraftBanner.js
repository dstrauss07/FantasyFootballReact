import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import DraftMenu from '../DraftMenu/DraftMenu';
import aux from '../../hoc/Aux';
import Classes from './DraftBanner.module.css';


const DraftBanner = (props) => {



    return (
        <Aux>
            <div className={Classes.draftBanner}>
                <div>Budget <br/> {props.currentLeagueSettings.startingBudget}</div>
                <div >Size <br/> {props.currentLeagueSettings.leagueSize}</div>
                <div >Qb <br/> {props.currentLeagueSettings.totalStartingQb}</div>
                <div >Rb <br/> {props.currentLeagueSettings.totalStartingRb}</div>
                <div >Wr <br/> {props.currentLeagueSettings.totalStartingWr}</div>
                <div >Te<br/> {props.currentLeagueSettings.totalStartingTe}</div>
                <div >Flex <br/> {props.currentLeagueSettings.totalStartingFlex}</div>
                <div >SFlex <br/> {props.currentLeagueSettings.totalStartingSFlex}</div>
                <div >DST <br/> {props.currentLeagueSettings.totalStartingD}</div>
                <div >K <br/> {props.currentLeagueSettings.totalStartingK}</div>
                <div>Players <br/> {props.currentLeagueSettings.totalPlayer}</div>
            </div>
        </Aux>


    )



}

export default DraftBanner;