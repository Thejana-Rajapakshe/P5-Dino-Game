import p5, { Vector } from "p5";
import BaseEntity from "./baseEntity";
import { game } from "../../mainSketch";
import { sharedContext } from "../../game";
import { gameEvent } from "../../gameInfo";

class Obstacle extends BaseEntity {
    constructor(vel: Vector, acc: Vector, pos: Vector, size: Vector){
        super(vel, acc, pos, size);
    }

    draw(p : p5) {
        super.draw(p);
    }

    update(){
        super.update();
        this.remove();
    }

    collide(entity: BaseEntity): void {
        
    }

    remove() {
        if(this.position.x < -this.size.x){
            this.alive = false;
            game.incrementScore();
            sharedContext.gameEvents.emit(gameEvent.newHighScore, sharedContext.gameInfo.score);
        }
    }

}

export default Obstacle;