import p5 from "p5";
import UIElement from "./UIElement";


class UIManager {
    private uiElements : UIElement[] = [];
    
    constructor(){

    }

    public addUiElement(element: UIElement){
        this.uiElements.push(element);
    }

    draw(p : p5) {
        this.uiElements.forEach((element) => {
            element.draw(p);
        })
    }

    update() {

    }
}

export default UIManager;