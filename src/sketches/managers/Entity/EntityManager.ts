import p5, { Vector } from "p5";
import BaseEntity from "./baseEntity";
import { collideRectRect } from "p5collide";
import { sharedContext } from "../../game";


class EntityManager {
    private entities : BaseEntity[] = []

    constructor() {

    }

    public add(entity: BaseEntity) {
        this.entities.push(entity);
    }

    public update() {
        this.entities = this.entities.filter((entity) => entity.isAlive());
        this.checkCollisions();
        this.goingToCollide();
        this.entities.forEach((entity) => {
            entity.update();
        })
    } 

    public draw(p: p5){
        this.entities.forEach((entity) => {
            entity.draw(p);
        })
    } 

    public removeByType(typeToRemove: any){
        this.entities = this.entities.filter((entity) => !(entity instanceof typeToRemove))
    }

    private checkCollisions() {
        this.entities.forEach((entity1) => {
            let x1 = entity1.getPos().x, 
            y1 = entity1.getPos().y, 
            w1 = entity1.getSize().x, 
            h1 = entity1.getSize().y;
            
            this.entities.forEach((entity2) => {
                if(entity1 === entity2) return;
                let x2 = entity2.getPos().x, 
                y2 = entity2.getPos().y, 
                w2 = entity2.getSize().x, 
                h2 = entity2.getSize().y;
                
                if(collideRectRect(x1, y1, w1, h1, x2, y2, w2, h2)){
                    entity1.collide(entity2);
                    entity2.collide(entity1);
                }
            })
        })
    }

    private goingToCollide() {
        this.entities.forEach(entity1 => {
            let x1 = entity1.getPos().x + entity1.getVel().x, 
            y1 = entity1.getPos().y + entity1.getVel().y, 
            w1 = entity1.getSize().x, 
            h1 = entity1.getSize().y;
            let topCollided=false, bottomCollided=false, rightCollided=false, leftCollided=false;
            this.entities.forEach(entity2 => {
                if(entity1 === entity2) return;
                let x2 = entity2.getPos().x + entity2.getVel().x, 
                y2 = entity2.getPos().y + entity2.getVel().y, 
                w2 = entity2.getSize().x, 
                h2 = entity2.getSize().y;

                if(y1 <= y2 + h2 && y1 > y2 && x1+5 <= x2+w2 && x1+w1-5 >= x2){
                    entity1.setCollideTop(true);
                    !entity1.isStatic() ? entity1.setPos(new Vector(x1, y2+h2)): 0;
                    topCollided=true;
                }
                
                if(y1+h1 >= y2 && y1+h1 < y2+h2 && x1+5 <= x2+w2 && x1+w1-5 >= x2){
                    entity1.setCollideBottom(true);
                    !entity1.isStatic() ? entity1.setPos(new Vector(x1, y2-h1)) : 0;
                    bottomCollided = true;
                }

                if(w2 >= sharedContext.gameInfo.canvasSize.x+20){
                    console.log(x1+w1 >= x2, x1+w1 < x2+w2, y1 <= y2+h2, y1+w1-5 >= y2)
                }
                if(x1+w1 >= x2 && x1+w1 < x2+w2 && y1 <= y2+h2 && y1+w1-10 >= y2){
                    entity1.setCollideRight(true);
                    !entity1.isStatic() ? entity1.setPos(new Vector(x2-w1, y1)) : 0;
                    rightCollided = true;
                }

                if(x1 <= x2 + w2 && x1 > x2 && y1 <= y2+h2 && y1+w1-10 >= y2){
                    entity1.setCollideLeft(true);
                    !entity1.isStatic() ? entity1.setPos(new Vector(x2+w2, y1)) : 0;
                    leftCollided = true;
                }
            })
            
            topCollided ? topCollided=false : entity1.setCollideTop(false);
            bottomCollided ? bottomCollided=false : entity1.setCollideBottom(false);
            rightCollided ? rightCollided=false : entity1.setCollideRight(false);
            leftCollided ? leftCollided=false : entity1.setCollideRight(false);
        })
    }

}

export default EntityManager;