import p5 from "p5";
import BaseEntity from "./baseEntity";
import { collideRectRect } from "p5collide";


class EntityManager {
    private entities : BaseEntity[] = []

    constructor() {

    }

    public add(entity: BaseEntity) {
        this.entities.push(entity);
    }

    public update() {
        this.entities = this.entities.filter((entity) => entity.isAlive);
        this.checkCollisions();
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

}

export default EntityManager;