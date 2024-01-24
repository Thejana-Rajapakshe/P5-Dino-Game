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
    p: p5,
    score: number,
    gameOver : boolean,
    initDone: boolean,
    canvasSize: Vector, 
}

class Game {
    public info : gameInfo =  {
        p: null as any, 
        score: 0,
        gameOver: false,
        initDone: false, 
        canvasSize: null as any
    };

    public inputMan : InputManager;
    public uiMan: UIManager;
    public gameEvents : gameInfoEvent;
    public entityMan : EntityManager;
    public camera : Camera;
    
    constructor(p : p5, canvasSize: Vector) {
        this.info.canvasSize = canvasSize;
        this.info.p = p;

        this.inputMan = new InputManager(p);
        this.uiMan = new UIManager();
        this.gameEvents = new gameInfoEvent();
        this.entityMan = new EntityManager();
        this.camera = new Camera(new Vector(0, 0))

        p.createCanvas(canvasSize.x, canvasSize.y);
        p.background(100);
    }
    
    init() {
        this.entityMan.add(
            new Dino(
                new Vector(0, 0), 
                new Vector(0, 0.1), 
                new Vector(20, 300), 
                new Vector(15, 15)
            )
        );
        
        this.entityMan.add(
            new Floor(
                new Vector(0, 0),
                new Vector(0, 0),
                new Vector(0, this.info.canvasSize.y - 30),
                new Vector(this.info.canvasSize.x+20, 30)
            )
        )

        this.uiMan.addUiElement(
            new Button(
                new Vector(this.info.canvasSize.x/2, this.info.canvasSize.y/2),
                new Vector(90, 30),
                "Restart",
                () => {this.reset()}
            )
        );
    }

    reset() {
        this.info.score = 0;
        this.entityMan.removeByType(BaseEntity);
        this.info.gameOver = false;
        this.info.initDone = false;
        this.gameEvents.emit(gameEvent.newHighScore, 0);
    }

    update() {
        if(this.info.initDone === false){
            this.init();
            this.info.initDone = true;
        }
        
        if(this.info.gameOver){
            return;
        }

        this.addObstacles();
        
        this.camera.update();
        this.entityMan.update();
    }

    private addObstacles() {
        let randInt: number = this.info.p.random(1);
        if(randInt < 0.005 && randInt > 0.001){
            this.entityMan.add(new Obstacle(
                new Vector(-1, 0), 
                new Vector(-randInt, 0), 
                new Vector(this.info.canvasSize.x, this.info.canvasSize.y-randInt*10000-30),
                new Vector(15 ,randInt*10000)
                ));
        }
    }

    draw() {
        this.info.p.background(200); //this should be in top
        
        this.entityMan.draw(this.info.p);

        if(!this.info.gameOver) return;
        this.uiMan.draw(this.info.p);
    }

    incrementScore() {
        console.log('incrementing score');
        this.info.score++; 
    }

}

export default Game;