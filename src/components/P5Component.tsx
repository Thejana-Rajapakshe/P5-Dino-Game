import React, {useEffect, useRef, useState} from 'react'
import sketch from "../sketches/mainSketch";
import p5 from 'p5';
import Game from '../sketches/game';
import { gameEvent } from '../sketches/gameInfo';
    

const P5Component = () => {
    const p5ContainerRef = useRef();

    useEffect(() => {
        const p5Instance = new p5(sketch, p5ContainerRef.current);

        return () => {
            p5Instance.remove();
        }        
    })

    return (
        <>
            <div ref={p5ContainerRef as any}> </div>
        </>
    )
}

export default P5Component;