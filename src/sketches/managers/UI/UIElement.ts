import p5, { Vector } from "p5";

class UIElement {
    protected pos: Vector;
    protected size: Vector;
    
    constructor(pos: Vector, size: Vector){
        this.pos = pos;
        this.size = size;
    }

    draw(p: p5){
        let x = this.pos.x, y = this.pos.y, w = this.size.x, h = this.size.y; 
        
        p.fill(255);
        p.stroke(0);
        p.rect(x-w/2, y-h/2, w, h);  
        p.textAlign(p.CENTER, p.CENTER);
        p.fill(0);
        p.noStroke();
        p.textSize(16);
    }

    update() {
        throw "Error: the updated function is not implemented"
    }
}

export default UIElement;