export class Vect {
	constructor(x = 0 ,y = 0) {
		this.x = x;
		this.y = y;
	}

	add(vect2) {
		return new Vect(this.x + vect2.x, this.y + vect2.y);
	}

	dot(scalar) {
		return new Vect(scalar*this.x, scalar*this.y);
	}

	// rotate anticlockwise by angle radians
	rotate(rad) {
		let cos = Math.cos(rad);
		let sin = Math.sin(rad);
		return new Vect(cos*this.x - sin*this.y, sin*this.x + cos*this.y);
	}



}