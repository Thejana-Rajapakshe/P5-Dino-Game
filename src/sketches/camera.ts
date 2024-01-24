import { Vector } from "p5";
import { game } from "./mainSketch";

class Camera {
    private position : Vector;

    private doShake : boolean;
    private time : number;

    constructor(pos: Vector){
        this.position = pos;
        this.doShake = false;
        this.time = 0;
    };

    shake(time : number){
        this.doShake = true;
        setTimeout(() => this.doShake = false, time*1000);
    }

    update() {
        let noise = game.info.p.noise;
        let frameCount = game.info.p.frameCount;
        let noiseScale = 1;
        let shakeIntensity = 15;

        if(this.doShake){
            // this.position.x = noise(frameCount * noiseScale) * shakeIntensity - shakeIntensity / 2;
            this.position.y = noise(frameCount * noiseScale + 1000) * shakeIntensity - shakeIntensity / 2;
        }else {
            this.position.x = 0;
            this.position.y = 0;
        }
    }

    getX() { return this.position.x; }
    getY() { return this.position.y; }
    getPos() { return this.position; }
}

export default Camera