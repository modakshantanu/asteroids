import { rotateVector2d, wrapAround } from "../utils/2dgrid";
import { relativeCoords } from "../utils/camera";
import { Vect } from "../utils/Vect";

export default class Ship {
	constructor(args) {
		this.pos = args.pos;
		this.vel = args.vel || new Vect(0,0);
		this.radius = 14.5;
		this.angle = args.angle || 0;
		this.lastFiredTime = new Date();
	}

	render(state) {

		
		if (state.input.pressedKeys.left) {
			this.angle -= 7;
		}
		if (state.input.pressedKeys.right) {
			this.angle += 7;
		}
		if(state.input.pressedKeys.forward) {
			var forwardAngle = this.angle - 90;
			
			this.vel = this.vel.add(new Vect(0.20,0).rotate(forwardAngle * Math.PI / 180));
		}
		

		this.pos = this.pos.add(this.vel);
		this.pos = wrapAround(this.pos);

		if( this.angle > 360) this.angle -= 360;
		if (this.angle < 0) this.angle += 360;

		// Drag 
		this.vel = this.vel.dot(0.98);
		
		var temp = this.pos;
		if (state.shipCam) {
			temp = relativeCoords(temp,temp);
		}
		

		const ctx = state.context;
		ctx.save();
		ctx.translate(0.5,0.5);
		ctx.translate(temp.x,temp.y);
		ctx.rotate(this.angle * Math.PI/180);
		ctx.strokeStyle = "#000000";
		ctx.fillStyle = "#888888";
		ctx.lineWidth = 0.5;
		ctx.beginPath();
		ctx.moveTo(0,0);
		ctx.lineTo(12.49,7.21);
		ctx.lineTo(0,-14.44);
		ctx.lineTo(-12.49,7.21);
		ctx.closePath();
		ctx.fill(); ctx.stroke();
		ctx.restore();
	
	}

	getHitbox() {
		let hitbox = [];
		hitbox.push({x: 12.49, y: 7.21});
		hitbox.push({x: 0, y: -14.44});
		hitbox.push({x: -12.49, y: 7.21});

	
		hitbox = hitbox.map((e) => {
			
			let {x,y} = rotateVector2d(e,this.angle);
			return {x:x+this.pos.x, y:y+this.pos.y};
		});
		return hitbox;
		
	}
}