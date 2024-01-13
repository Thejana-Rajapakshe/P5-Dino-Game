import { Vector } from "p5";
import BaseEntity from "./baseEntity";
import { game } from "../../mainSketch";
import Obstacle from "./obstacle";
import { gameEvent } from "../../gameInfo";


class Dino extends BaseEntity {
    constructor(vel : Vector, acc : Vector, pos: Vector, size: Vector){
        super(vel, acc, pos, size);
        game.inputMan.addBinding(game.info.p.UP_ARROW, undefined, undefined, () => {this.jump(10)});
    }

    jump(force: number) {
        const onGround = this.position.y + this.size.y >= game.info.canvasSize.y;

        if (onGround) {
          this.velocity.y = -force;
        }        
    }
    
    update() {
        super.update();
        this.gravity(0.4);
    }

    collide(entity: BaseEntity): void {
        if(entity instanceof Obstacle){
            game.gameOver = true;
        }
    }

    gravity(gravity: number = 0.1) {
        this.velocity.y += gravity;
        this.position.y = game.info.p.constrain(this.position.y, 0, game.info.canvasSize.y - this.size.y);
        const onGround = this.position.y + this.size.y >= game.info.canvasSize.y;
        if (onGround) {
            this.position.y = game.info.canvasSize.y - this.size.y;
            this.velocity.y = 0;
        }
    }

}

export default Dino;