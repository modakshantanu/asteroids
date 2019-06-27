import {wrapAround, rotateVector2d} from '../utils/2dgrid';
import {randomBetween} from '../utils/math';
import { relativeCoords } from '../utils/camera';
import { Vect } from '../utils/Vect';
const degToRadians = deg => deg*Math.PI/180;
const rotateUnit = (degrees) => {
	var radians = degToRadians(degrees);
	return { x : Math.cos(radians) , y : Math.sin(radians)}
}

export default class Asteroid {
	constructor(args) {
		this.pos=  args.pos || new Vect(0,0);
		this.r = args.r || 0;
		this.vel = args.vel || new Vect(0,0);
		this.dr = args.dr || 0;
		this.distances = args.vertexDistances || [-1];
		this.sizeCategory = args.sizeCategory || 3;

		this.delete = false;

		// If distances were not manually provided, generate random distances 
		if (this.distances.length === 1) {
			this.distances.splice(0,1);
			let m = this.sizeCategory*10;
			for (let i = 0; i < 6; i++) {
				let r = this.sizeCategory*randomBetween(-2,2);
				this.distances.push(Math.round(m + r));
				
			}
		}
		
		// Generate array of points of the asteroid
		this.points = this.distances.map((v,i) => {
			var unitVector = rotateUnit(60*i);
			return {x: v*unitVector.x, y: v*unitVector.y};
		});

		this.radius = this.distances.reduce((a,b) => Math.max(a,b));
	}

	render(state,ship) {

		this.pos = this.pos.add(this.vel);
		this.r += this.dr;
		
		this.pos = wrapAround(this.pos);
		
		var temp = this.pos;
		if (state.shipCam) {
			temp = relativeCoords(temp,ship);
		}

		// Generate an svg path string from the points given
		var pathString = `M${ this.points[0].x} ${this.points[0].y} `
		for (let i = 1; i < this.points.length; i++) {
			pathString += `L ${this.points[i].x} ${this.points[i].y} `;
		}
		pathString += 'Z';

		const ctx = state.context;
		ctx.save();
		
		ctx.translate(0.5,0.5);
		ctx.translate(temp.x,temp.y);
		ctx.rotate(this.r * Math.PI/180);
		ctx.strokeStyle = "#000000";
		ctx.fillStyle = "#ffffff";
		ctx.lineWidth = 1;
		var path = new Path2D(pathString);
		ctx.stroke(path);
		ctx.restore();

		

	}

	// Get array of points showing the asteroid
	getHitbox() {
		let hitbox = this.points.map(e => {
			let {x,y} = rotateVector2d(e,this.r);
			return {x: x+this.pos.x, y: y + this.pos.y};
		});


		return hitbox;
		
	}
}