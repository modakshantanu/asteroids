import { Vect } from "../utils/Vect";
import { wrapAround } from "../utils/2dgrid";
import { relativeCoords } from "../utils/camera";

export default class Bullet {
	constructor(args) {
		this.pos = args.pos || new Vect(0,0);
		this.vel = args.vel || new Vect();
		this.lifeTime = args.lifeTime || 200;
		this.delete = 0;
		this.radius = 2;
	}
	
	render(state,ship) {

		this.pos = wrapAround(this.pos.add(this.vel));

		var temp = this.pos;
		if (state.shipCam) {
			temp = relativeCoords(temp,ship);
		}
	
		this.lifeTime--;
		if (this.lifeTime === 0) {
			this.delete = true;
		}
		const ctx = state.context;
		ctx.save();
		ctx.translate(0.5,0.5);
		ctx.beginPath();
		ctx.fillStyle = "#ff0000";
		ctx.lineWidth = 0.5;
		ctx.arc(temp.x,temp.y,2,0,2*Math.PI);
		ctx.fill();
		ctx.restore();
	}
}