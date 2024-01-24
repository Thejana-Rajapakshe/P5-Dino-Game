import React, { useEffect, useState } from "react"
import { sharedContext } from "../sketches/game";
import { gameEvent } from "../sketches/gameInfo";

const GameInfo = () => {
    const [highScore, setHighScore] = useState<number>(0);
    
    useEffect(() => {
        setTimeout(() => sharedContext.gameEvents.add(gameEvent.newHighScore, setHighScore), 10);
    })

    return (
        <>
            <h1>{highScore}</h1>
        </>
    )

}

export default GameInfo;