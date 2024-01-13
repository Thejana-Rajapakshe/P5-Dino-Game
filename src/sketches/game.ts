import p5, { Vector } from "p5";
import collide, { collideRectRect } from "p5collide";
import Button from "./managers/UI/button";
import InputManager from "./managers/InputManager";
import UIManager from "./managers/UI/UIManager";
import gameInfoEvent, { gameEvent } from "./gameInfo";
import EntityManager from "./managers/Entity/EntityManager";
import Dino from "./managers/Entity/dino";
import Obstacle from "./managers/Entity/obstacle";

interface gameInfo {
    p: p5,
    score: number,
    canvasSize: Vector,
}

class Game {
    public info : gameInfo =  {p: null as any, score: 0, canvasSize: null as any};
    public inputMan : InputManager;
    public uiMan: UIManager;
    public gameEvents : gameInfoEvent;
    public entityMan : EntityManager;
    
    public gameOver: boolean = false;
    constructor(p : p5, canvasSize: Vector) {
        this.info.canvasSize = canvasSize;
        this.info.p = p;

        this.inputMan = new InputManager(p);
        this.uiMan = new UIManager();
        this.gameEvents = new gameInfoEvent();
        this.entityMan = new EntityManager();
        
        //if setTimeout isn't used, it will result in a reference error science the 
        //enetityMan and uiMan is not yet fully initialized
        setTimeout(() => {
            this.entityMan.add(
                new Dino(
                    new Vector(0, 0), 
                    new Vector(0, 0), 
                    new Vector(20, 0), 
                    new Vector(10, 10)
                )
            );
            
            this.uiMan.addUiElement(
                new Button(
                    new Vector(this.info.canvasSize.x/2, this.info.canvasSize.y/2),
                    new Vector(90, 30),
                    "Restart",
                    () => {this.gameOver = false; this.entityMan.removeByType(Obstacle)}
                )
            );
        })
        
        p.createCanvas(canvasSize.x, canvasSize.y);
        p.background(100);
    }

    init() {
        
    }
    
    update() {
        if(this.gameOver){
            return;
        }

        this.addObstacles();

        this.entityMan.update();
    }

    private addObstacles() {
        let randInt: number = this.info.p.random(1);
        if(randInt < 0.005 && randInt > 0.001){
            this.entityMan.add(new Obstacle(
                new Vector(-1, 0), 
                new Vector(-randInt, 0), 
                new Vector(this.info.canvasSize.x, this.info.canvasSize.y-randInt*10000),
                new Vector(10 ,randInt*10000)
                ));
        }
    }

    draw() {
        this.info.p.background(200); //this should be in top
        
        this.entityMan.draw(this.info.p);

        if(!this.gameOver) return;
        this.uiMan.draw(this.info.p);
    }

    incrementScore() {
        console.log('incrementing score');
        this.info.score++; 
    }

}

export default Game;