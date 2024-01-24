import p5, { Color, Vector } from "p5"
import Camera from "../../camera";
import { game } from "../../mainSketch";

class BaseEntity {
    protected alive: boolean = true;
    protected velocity : Vector;  
    protected acceleration : Vector;  
    protected position : Vector;
    protected size : Vector;  

    protected collideXright = false; 
    protected collideXleft = false; 
    protected collideYtop = false; 
    protected collideYbottom = false;
    
    protected static = false;

    constructor(velocity: Vector, acceleration: Vector, position: Vector, size: Vector) {
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.position = position;
        this.size = size;
    }

    draw(p : p5) {
        p.fill(225);
        p.stroke(0);

        let x = this.position.x - game.camera.getX();
        let y = this.position.y - game.camera.getY();
        p.rect(x, y, this.size.x, this.size.y);
    }

    update(){
        if(this.static === true){
            return;
        }

        if(this.velocity.x > 0){
            !this.collideXleft ? this.position.x += this.velocity.x : true;
        }else{
            !this.collideXright ? this.position.x += this.velocity.x : true;
        }

        if(this.velocity.y > 0){
            !this.collideYbottom ? this.position.y += this.velocity.y : this.velocity.y = 0;
        }else{
            !this.collideYtop ? this.position.y += this.velocity.y : true;
        }
        
        
        this.velocity.x += this.acceleration.x; 
        this.acceleration.y += this.velocity.y;
    }

    collide(entity: BaseEntity) {
        
    }

    setAcc(acc: Vector){this.acceleration = acc;}
    setPos(pos: Vector){this.position = pos;}
    setVel(vel: Vector){this.velocity = vel;}
    setSize(size: Vector){this.size = size;}
    setCollideTop(state: boolean){this.collideYtop = state;}
    setCollideBottom(state: boolean){this.collideYbottom = state;}
    setCollideLeft(state: boolean){this.collideXleft = state;}
    setCollideRight(state: boolean){this.collideXright = state;}


    getPos() {return this.position;}
    getAcc() {return this.acceleration;}
    getVel() {return this.velocity;}
    getSize() {return this.size;}
    isAlive() {return this.alive;}
    isStatic() {return this.static;}
}

export default BaseEntity;