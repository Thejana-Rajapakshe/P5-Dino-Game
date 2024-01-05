import p5, { Vector } from "p5"
import { collidePointRect } from "p5collide";

interface Bind {
    keyCode: number | undefined;
    callback: () => void | undefined;
    pos?: Vector | undefined;
    area?: Vector | undefined; 
}

class InputManager {
    private p : p5;
    private bindings : Bind[];

    constructor(p : p5){
        this.bindings = [];
        this.p = p;
        p.keyPressed = this.keyPressed;
        p.mouseClicked = this.mouseClicked;
    }

    addBinding(
        keyCode: number | undefined, 
        pos: Vector | undefined, 
        area: Vector | undefined, 
        callBack: () => void | undefined
        ) {
            this.bindings.push({keyCode:keyCode, pos: pos, area: area, callback: callBack});    
    }

    private keyPressed = () => {
        this.bindings.forEach((bind) => {
            if(bind.keyCode === this.p.keyCode){
                bind.callback();
            }
        })
    }

    private mouseClicked = () => {
        this.bindings.forEach((bind) => {
            if(bind.pos == undefined || bind.area == undefined) return;
            let pressed = collidePointRect
            (
                this.p.mouseX, 
                this.p.mouseY, 
                bind.pos?.x - bind.area?.x/2, 
                bind.pos?.y - bind.area?.y/2, 
                bind.area?.x, 
                bind.area?.y
            );
            if(pressed) {
                bind.callback();
            }
        })
    }
}

export default InputManager;