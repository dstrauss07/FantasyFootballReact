import React from 'react';

const player = (props) =>{
    return(
        <div>
            <p>{props.playerName}</p>
            <p>{props.playerPos} {props.playerPosRank}</p>
            <p>{props.playerRank}</p>
        </div>
    )
}

export default player;