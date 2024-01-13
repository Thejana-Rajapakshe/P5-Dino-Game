import React, { useEffect, useState } from "react"
import { game } from "../sketches/mainSketch";
import { gameEvent } from "../sketches/gameInfo";

const GameInfo = () => {
    const [highScore, setHighScore] = useState(0);
    
    useEffect(() => {
        setTimeout(() => game.gameEvents.add(gameEvent.newHighScore, setHighScore), 10);
    })

    return (
        <>
            <h1>{highScore}</h1>
        </>
    )

}

export default GameInfo;