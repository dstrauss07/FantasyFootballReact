import React from 'react';
import Aux from '../../hoc/Aux';

const ControlMenu = (props) => {

    let loginScript = "Here I am rock me like a hurricane";

    if(props.currentUser != null)
    {
        console.log("loggin in");
        loginScript = "hello " + props.currentUser.name;
    }
    return (
    
        <Aux>
            <div>
                <div>{loginScript} </div>
                <button onClick={()=>props.clickOptions(0)}>Rankings</button>
                <button onClick={()=>props.clickOptions(1)}>Draft</button>
                <button onClick={()=>props.clickOptions(2)}>Auction</button>
                <button onClick={()=>props.clickOptions(3)}>Login</button>
            </div>
        </Aux>
    );
}

export default ControlMenu;