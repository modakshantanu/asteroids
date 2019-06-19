export default class Bullet {
	constructor(args) {
		this.x = args.x;
		this.y = args.y;
		this.dx = args.dx || 0;
		this.dy = args.dy || 0;
		this.lifeTime = args.lifeTime || 200;
		this.destroy = args.destroy;
		this.delete = 0;
		this.radius = 2;
	}
	
	render(state) {

		this.x += this.dx;
		this.y += this.dy;

		// wrapping around
		if (this.x > 500) this.x = 0;
		else if (this.x < 0) this.x = 500;
		if (this.y> 500) this.y = 0;
		else if (this.y < 0) this.y = 500;

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
		ctx.arc(this.x,this.y,2,0,2*Math.PI);
		ctx.fill();
		ctx.restore();
	}
}