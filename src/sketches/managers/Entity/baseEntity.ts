import p5, { Color, Vector } from "p5"

class BaseEntity {
    protected alive: boolean = true;
    protected velocity : Vector;  
    protected acceleration : Vector;  
    protected position : Vector;
    protected size : Vector;  

    constructor(velocity: Vector, acceleration: Vector, position: Vector, size: Vector) {
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.position = position;
        this.size = size;
    }

    draw(p : p5) {
        p.fill(225);
        p.stroke(0);
        p.rect(this.position.x, this.position.y, this.size.x, this.size.y);
    }

    update(){
        this.position.x += this.velocity.x; this.position.y += this.velocity.y;
        this.velocity.x += this.acceleration.x; this.acceleration.y += this.velocity.y;
    }

    collide(entity: BaseEntity) {
        throw "ERROR: collide functino is not defined";
    }


    setAcc(acc: Vector){this.acceleration = acc;}
    setPos(pos: Vector){this.position = pos;}
    setVel(vel: Vector){this.velocity = vel;}
    setSize(size: Vector){this.size = size;}

    getPos() {return this.position;}
    getAcc() {return this.acceleration;}
    getVel() {return this.velocity;}
    getSize() {return this.size;}
    isAlive() {return this.alive;}
}

export default BaseEntity;