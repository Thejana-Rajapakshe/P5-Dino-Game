import { Vector } from "p5";
import BaseEntity from "./baseEntity";
import Game from "../../game";
import Obstacle from "./obstacle";


class Dino extends BaseEntity {
    constructor(vel : Vector, acc : Vector, pos: Vector, size: Vector){
        super(vel, acc, pos, size);
        Game.inputMan.addBinding(Game.info.p.UP_ARROW, undefined, undefined, () => {this.jump(10)});
    }

    jump(force: number) {
        const onGround = this.position.y + this.size.y >= Game.info.canvasSize.y;

        if (onGround) {
          this.velocity.y = -force;
        }        
    }
    
    update() {
        super.update();
        this.gravity(0.4);
        // if(Game.info.p.keyIsDown(Game.info.p.UP_ARROW)){
            // this.jump(10);
        // }
    }

    collide(entity: BaseEntity): void {
        if(entity instanceof Obstacle){
            Game.gameOver = true;
        }
    }

    gravity(gravity: number = 0.1) {
        this.velocity.y += gravity;
        this.position.y = Game.info.p.constrain(this.position.y, 0, Game.info.canvasSize.y - this.size.y);
        const onGround = this.position.y + this.size.y >= Game.info.canvasSize.y;
        if (onGround) {
            this.position.y = Game.info.canvasSize.y - this.size.y;
            this.velocity.y = 0;
        }
    }

}

export default Dino;