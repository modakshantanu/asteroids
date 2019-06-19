import {wrapAround} from '../utils/2dgrid';

const degToRadians = deg => deg*Math.PI/180;
const rotateUnit = (degrees) => {
	var radians = degToRadians(degrees);
	return { x : Math.cos(radians) , y : Math.sin(radians)}
}

export default class Asteroid {
	constructor(args) {
		this.x = args.x;
		this.y = args.y;
		this.r = args.r || 0;
		this.dx = args.dx ||0;
		this.dy = args.dy || 0;
		this.dr = args.dr || 0;
		this.distances = args.vertexDistances || [-1];

		
		this.sizeCategory = args.sizeCategory || 3;
		this.delete = false;
	
		if (this.distances.length === 1) {
			this.distances.splice(0,1);
			let m = this.sizeCategory*10;
			for (let i = 0; i < 6; i++) {
				let r = this.sizeCategory*(Math.random()-0.5)*3;
				this.distances.push(Math.round(m + r));
				
			}
		}

		this.points = this.distances.map((v,i) => {
			var unitVector = rotateUnit(60*i);
			return {x: v*unitVector.x, y: v*unitVector.y};
		});

		this.radius = this.distances.reduce((a,b) => Math.max(a,b));
	}

	render(state) {

		this.x += this.dx;
		this.y += this.dy;
		this.r += this.dr;
		
		({x:this.x , y:this.y} = wrapAround({x:this.x,y:this.y}));
		

		var pathString = `M${ this.points[0].x} ${this.points[0].y} `
		for (let i = 1; i < this.points.length; i++) {
			pathString += `L ${this.points[i].x} ${this.points[i].y} `;
		}
		pathString += 'Z';

		const ctx = state.context;
		ctx.save();
		
		ctx.translate(0.5,0.5);
		ctx.translate(this.x,this.y);
		ctx.rotate(this.r * Math.PI/180);
		ctx.strokeStyle = "#000000";
		ctx.fillStyle = "#ffffff";
		ctx.lineWidth = 1;
		var path = new Path2D(pathString);

		ctx.stroke(path);
		ctx.restore();

	}
}