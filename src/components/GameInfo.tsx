import React, { useEffect, useState } from "react"
import Game from "../sketches/game";
import { gameEvent } from "../sketches/gameInfo";

const GameInfo = () => {
    const [highScore, setHighScore] = useState(0);
    
    useEffect(() => {
        setTimeout(() => Game.gameEvents.add(gameEvent.newHighScore, setHighScore), 1000);
    })

    return (
        <>
            <h1>{highScore}</h1>
        </>
    )

}

export default GameInfo;