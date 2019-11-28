import React from 'react';
import Aux from '../../../hoc/ReactAux';
import Classes from './RankingController.module.css'


const RankingController = (props) => {

    let standardClass,pprClass,dynastyClass,allClass,qbClass,rbClass,wrClass,teClass,dstClass,kClass,saveClass;

    switch(props.scoringType){
        case "standard":
        standardClass = Classes.Active;
        break;
        case "ppr":
        pprClass = Classes.Active;
        break;
        case "dynasty":
        dynastyClass= Classes.Active;
        break;
        default:
                standardClass = Classes.Active;
                break;
    }

    switch(props.positionFilter){
        case "ALL":
        allClass = Classes.Active;
        break;
        case "QB":
        qbClass = Classes.Active;
        break;
        case "RB":
        rbClass= Classes.Active;
        break;
        case "WR":
        wrClass= Classes.Active;
        break;
        case "TE":
        teClass= Classes.Active;
        break;
        case "DST":
        dstClass= Classes.Active;
        break;
        case "K":
        kClass= Classes.Active;
        break;
        default:
            break;
    }

    if(props.isChanged)
    {
        saveClass=Classes.saveClass
    }
    else
    {
        saveClass=Classes.hideButton
    }

    return (
        <Aux>
            <div className={Classes.center} >
                <button className={saveClass} onClick={() => props.saveRankingsHandler()}>Save Rankings!</button>
            </div>
            <div className={Classes.ButtonMenu}>
                <div>
                    <button className={standardClass} onClick={() => props.scoringChangeHandler(0)}>Standard</button>
                    <button className={pprClass} onClick={() => props.scoringChangeHandler(1)}>PPR</button>
                    <button className={dynastyClass} onClick={() => props.scoringChangeHandler(2)}>Dynasty</button>
                </div>
                <div>
                    <button className={allClass} onClick={() => props.positionChangeHandler(0)}>All</button>
                    <button className={qbClass} onClick={() => props.positionChangeHandler(1)}>QB</button>
                    <button className={rbClass} onClick={() => props.positionChangeHandler(2)}>RB</button>
                    <button className={wrClass} onClick={() => props.positionChangeHandler(3)}>WR</button>
                    <button className={teClass} onClick={() => props.positionChangeHandler(4)}>TE</button>
                    <button className={dstClass} onClick={() => props.positionChangeHandler(5)}>DST</button>
                    <button className={kClass} onClick={() => props.positionChangeHandler(6)}>K</button>
                </div>
            </div>
        </Aux>
    );

}

export default RankingController;