import React from 'react';
import Aux from '../../hoc/ReactAux';
import Classes from './ControlMenu.module.css';

const ControlMenu = (props) => {

    let loginClass, logoutClass;
    let userName;

    if(props.currentUser != null)
    {
        loginClass = Classes.hide;
        logoutClass = Classes.show;
        userName=  props.currentUser.name;
    }
    else
    {
        loginClass = Classes.show;
        logoutClass = Classes.hide;
    }



    return (
   
        <Aux>
            <div className={Classes.containerGrid}>
            <div className={loginClass}>
                <button onClick={()=>props.clickOptions(3)}>Login</button>
            </div>
            <div className={logoutClass}>
                <h3>Hello {userName}</h3>
                <button onClick={()=>props.loggedInHandler()}>Logout</button>
            </div>
            <div className={Classes.modeButtons}>
                <button className={Classes.modeButton} onClick={()=>props.clickOptions(0)}>Rankings</button>
                <button className={Classes.modeButton} onClick={()=>props.clickOptions(1)}>Snake</button>
                <button className={Classes.modeButton} onClick={()=>props.clickOptions(2)}>Auction</button>
            </div>
            </div>
        </Aux>
    );
}

export default ControlMenu;