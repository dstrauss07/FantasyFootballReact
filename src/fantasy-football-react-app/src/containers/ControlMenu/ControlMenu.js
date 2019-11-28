import React from 'react';
import Aux from '../../hoc/ReactAux';
import Classes from './ControlMenu.module.css';

const ControlMenu = (props) => {

    let loginClass, logoutClass;
    let userName;

    if(props.currentUser != null)
    {
        console.log("logged in");
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
            <div className={loginClass}>
                <button onClick={()=>props.clickOptions(3)}>Login</button>
            </div>
            <div className={logoutClass}>
                <h3>Hello {userName}</h3>
                <button onClick={()=>props.loggedInHandler()}>Logout</button>
            </div>
            <div>
                <button onClick={()=>props.clickOptions(0)}>Rankings</button>
                <button onClick={()=>props.clickOptions(1)}>Draft</button>
                <button onClick={()=>props.clickOptions(2)}>Auction</button>
            </div>
        </Aux>
    );
}

export default ControlMenu;