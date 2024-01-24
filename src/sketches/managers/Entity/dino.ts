import { Vector } from "p5";
import BaseEntity from "./baseEntity";
import { sharedContext } from "../../game";
import Obstacle from "./obstacle";


class Dino extends BaseEntity {
    private jumped = false;

    constructor(vel : Vector, acc : Vector, pos: Vector, size: Vector){
        super(vel, acc, pos, size);
        sharedContext.inputMan.addBinding(sharedContext.p.UP_ARROW, undefined, undefined, () => {this.jump(10)});
    }

    jump(force: number) {
        this.jumped = true;

        if (this.collideYbottom) {
            this.velocity.y = -force;
        }        
    }
    
    update() {
        super.update();
        this.position.y = sharedContext.p.constrain(this.position.y, 0, sharedContext.gameInfo.canvasSize.y - this.size.y);
        this.position.x = sharedContext.p.constrain(this.position.x, 0, sharedContext.gameInfo.canvasSize.x - this.size.x);
        if(this.collideYbottom && this.jumped){
            this.jumped = false;
            sharedContext.camera.shake(0.1)
        }

        !this.collideYbottom ? this.gravity(0.4): this.velocity.y = 0;
    }

    collide(entity: BaseEntity): void {
        if(entity instanceof Obstacle){
            sharedContext.gameInfo.gameOver = true;
        }

    }

    gravity(strength: number = 0.1) {
        if (!this.collideYbottom) {
            this.velocity.y += strength;
        }else{
            this.velocity.y = 0;
        }
    }

}

export default Dino;