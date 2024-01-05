import p5, { Vector } from "p5";
import BaseEntity from "./baseEntity";

class Obstacle extends BaseEntity {
    constructor(vel: Vector, acc: Vector, pos: Vector, size: Vector){
        super(vel, acc, pos, size);
    }

    draw(p : p5) {
        super.draw(p);
    }

    collide(entity: BaseEntity): void {
        
    }

}

export default Obstacle;