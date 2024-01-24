import { Vector } from "p5";
import BaseEntity from "./baseEntity";


class Floor extends BaseEntity{
    constructor(vel: Vector, acc: Vector, pos: Vector, size: Vector){
        super(vel, acc, pos, size);
        this.static = true;
    }

    collide(entity: BaseEntity){
        
    }

}

export default Floor;