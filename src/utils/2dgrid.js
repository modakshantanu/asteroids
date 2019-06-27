import { Vect } from "./Vect";
import {constants} from "./constants";

export function wrapAround(position, bounds = constants.gameBounds) {

	let {width,height} = bounds;

	var {x,y} = position;
	if (x > width) x -= width;
	if (x < 0) x += width;
	if (y > height) y -= height;
	if (y < 0) y += height;
	return new Vect(x,y);
}

export function distance(v1,v2) {
	return Math.sqrt((v1.x - v2.x)**2 + (v1.y-v2.y)**2);
}

// Rotates the vector (x,y) anticlockwise by deg degrees
export function rotateVector2d(vect,deg) {
	let {x,y} = vect;
	let rad = deg*Math.PI/180;
	let cos = Math.cos(rad);
	let sin = Math.sin(rad);
	return {
		x : cos*x - sin*y,
		y : sin*x + cos*y
	}
}

