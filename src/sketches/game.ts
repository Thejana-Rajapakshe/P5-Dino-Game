import p5, { Vector } from "p5";
import Button from "./managers/UI/button";
import InputManager from "./managers/InputManager";
import UIManager from "./managers/UI/UIManager";
import gameInfoEvent, { gameEvent } from "./gameInfo";
import EntityManager from "./managers/Entity/EntityManager";
import Dino from "./managers/Entity/dino";
import Obstacle from "./managers/Entity/obstacle";
import Camera from "./camera";
import BaseEntity from "./managers/Entity/baseEntity";
import Floor from "./managers/Entity/floor";

interface gameInfo {
    score: number,
    gameOver : boolean,
    initDone: boolean,
    canvasSize: Vector, 
}

interface sharedContext {
    gameInfo: gameInfo,
    p: p5,
    inputMan : InputManager,
    uiMan : UIManager,
    gameEvents : gameInfoEvent,
    entityMan : EntityManager,
    camera : Camera
}

export let sharedContext : sharedContext;

class Game {

    constructor(p : p5, canvasSize: Vector) {

        sharedContext = {
            gameInfo : {
                score: 0,
                gameOver: false,
                initDone: false, 
                canvasSize: canvasSize
            },
            p : p,
            inputMan : new InputManager(p),
            uiMan : new UIManager(),
            gameEvents : new gameInfoEvent(),
            entityMan : new EntityManager(),
            camera : new Camera(new Vector(0, 0))
        }

        p.createCanvas(canvasSize.x, canvasSize.y);
        p.background(100);
    }
    
    init() {
        sharedContext.entityMan.add(
            new Dino(
                new Vector(0, 0), 
                new Vector(0, 0.1), 
                new Vector(20, 300), 
                new Vector(15, 15)
            )
        );
        
        sharedContext.entityMan.add(
            new Floor(
                new Vector(0, 0),
                new Vector(0, 0),
                new Vector(0, sharedContext.gameInfo.canvasSize.y - 30),
                new Vector(sharedContext.gameInfo.canvasSize.x+20, 30)
            )
        )

        sharedContext.uiMan.addUiElement(
            new Button(
                new Vector(sharedContext.gameInfo.canvasSize.x/2, sharedContext.gameInfo.canvasSize.y/2),
                new Vector(90, 30),
                "Restart",
                () => {this.reset()}
            )
        );
    }

    reset() {
        sharedContext.gameInfo.score = 0;
        sharedContext.entityMan.removeByType(BaseEntity);
        sharedContext.gameInfo.gameOver = false;
        sharedContext.gameInfo.initDone = false;
        sharedContext.gameEvents.emit(gameEvent.newHighScore, 0);
    }

    update() {
        if(sharedContext.gameInfo.initDone === false){
            this.init();
            sharedContext.gameInfo.initDone = true;
        }
        
        if(sharedContext.gameInfo.gameOver){
            return;
        }

        this.addObstacles();
        
        sharedContext.camera.update();
        sharedContext.entityMan.update();
    }

    private addObstacles() {
        let randInt: number = sharedContext.p.random(1);
        if(randInt < 0.005 && randInt > 0.001){
            sharedContext.entityMan.add(new Obstacle(
                new Vector(-1, 0), 
                new Vector(-randInt, 0), 
                new Vector(sharedContext.gameInfo.canvasSize.x, sharedContext.gameInfo.canvasSize.y-randInt*10000-30),
                new Vector(15 ,randInt*10000)
                ));
        }
    }

    draw() {
        sharedContext.p.background(200); //this should be in top
        
        sharedContext.entityMan.draw(sharedContext.p);

        if(!sharedContext.gameInfo.gameOver) return;
        sharedContext.uiMan.draw(sharedContext.p);
    }

    public incrementScore() {
        console.log('incrementing score');
        sharedContext.gameInfo.score++; 
    }

}

export default Game;