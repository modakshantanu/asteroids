export default class Ship {
	constructor(args) {
		this.x = args.x;
		this.y = args.y;
		this.dx = args.dx || 0;
		this.dy = args.dy || 0;
		this.radius = 14.5;
		this.angle = args.angle || 0;
		this.lastFiredTime = new Date();
	}

	render(state) {

		if (state.input.pressedKeys.left) {
			this.angle -= 5;
		}
		if (state.input.pressedKeys.right) {
			this.angle += 5;
		}
		if(state.input.pressedKeys.forward) {
			var forwardAngle = this.angle - 90;
			this.dx += 0.15*Math.cos(forwardAngle * Math.PI / 180);
			this.dy += 0.15*Math.sin(forwardAngle * Math.PI / 180);
		}
		

		this.x += this.dx;
		this.y += this.dy;

		// wrapping around
		if (this.x > 500) this.x = 0;
		else if (this.x < 0) this.x = 500;
		if (this.y> 500) this.y = 0;
		else if (this.y < 0) this.y = 500;

		// Drag 
		this.dx *= 0.98;
		this.dy *= 0.98;

		

		const ctx = state.context;
		ctx.save();
		ctx.translate(0.5,0.5);
		ctx.translate(this.x,this.y);
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
}