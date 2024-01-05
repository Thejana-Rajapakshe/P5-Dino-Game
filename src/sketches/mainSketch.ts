import p5, { Vector } from "p5";
import Game from "./game";

function sketch(p: p5) {
    let game: Game;
    
    p.setup = function () {
        game = new Game(p, p.createVector(600, 400));
    }

    p.draw = function() {
        game.update();
        game.draw();
    }
}

export default sketch;