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
    canvasSize: Vector,
}

class Game {
    static info : gameInfo =  {p: null as any, canvasSize: null as any};
    static inputMan : InputManager;
    static uiMan: UIManager;
    static gameEvents : gameInfoEvent;
    static entityMan : EntityManager;
    
    static gameOver: boolean = false;
    constructor(p : p5, canvasSize: Vector) {
        Game.info.canvasSize = canvasSize;
        Game.info.p = p;

        Game.inputMan = new InputManager(p);
        Game.uiMan = new UIManager();
        Game.gameEvents = new gameInfoEvent();
        Game.entityMan = new EntityManager();
        

        Game.entityMan.add(
            new Dino(
                new Vector(0, 0), 
                new Vector(0, 0), 
                new Vector(20, 0), 
                new Vector(10, 10)
            )
        );
        
        Game.uiMan.addUiElement(
            new Button(
                new Vector(Game.info.canvasSize.x/2, Game.info.canvasSize.y/2),
                new Vector(90, 30),
                "Restart",
                () => {Game.gameOver = false; Game.entityMan.removeByType(Obstacle)}
            )
        );
        
        p.createCanvas(canvasSize.x, canvasSize.y);
        p.background(100);
    }
    
    update() {
        if(Game.gameOver){
            return;
        }

        this.addObstacles();

        Game.entityMan.update();
    }

    private addObstacles() {
        let randInt: number = Game.info.p.random(1);
        if(randInt < 0.005 && randInt > 0.001){
            Game.entityMan.add(new Obstacle(
                new Vector(-1, 0), 
                new Vector(-randInt, 0), 
                new Vector(Game.info.canvasSize.x, Game.info.canvasSize.y-randInt*10000),
                new Vector(10 ,randInt*10000)
                ));
        }
    }

    draw() {
        Game.info.p.background(200); //this should be in top
        
        Game.entityMan.draw(Game.info.p);

        if(!Game.gameOver) return;
        Game.uiMan.draw(Game.info.p);
    }

}

export default Game;