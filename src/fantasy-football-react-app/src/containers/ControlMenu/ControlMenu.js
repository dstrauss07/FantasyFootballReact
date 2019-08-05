import React from 'react';
import Aux from '../../hoc/Aux';

const ControlMenu = (props) => {

    return (
        <Aux>
            <div>
                <button onClick={()=>props.clickOptions(0)}>Rankings</button>
                <button onClick={()=>props.clickOptions(1)}>Draft</button>
                <button onClick={()=>props.clickOptions(2)}>Auction</button>
                <button onClick={()=>props.clickOptions(3)}>Login</button>
            </div>
        </Aux>
    );
}

export default ControlMenu;