import p5, { Vector } from "p5";
import UIElement from "./UIElement";
import { sharedContext } from "../../game";
class Button extends UIElement {
    private label: string;
    private action() {}

    constructor(pos: Vector, size: Vector, label: string, action : () => void) {
        super(pos, size);
        this.label = label;
        this.action = action;
        sharedContext.inputMan.addBinding(undefined, this.pos, this.size, action);        
    }


    override draw(p: p5) {
        let x = this.pos.x, y = this.pos.y, w = this.size.x, h = this.size.y;
        super.draw(p);
        p.text(this.label, x, y);
    }

    override update(){
    
    }
}

export default Button;