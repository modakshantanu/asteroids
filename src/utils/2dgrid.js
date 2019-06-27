import { Vect } from "./Vect";
import {constants} from "./constants";

export function wrapAround(position) {

	let {width,height} = constants.gameBounds;

	var {x,y} = position;
	while (x >width) x -= width;
	while (x < 0) x += width;
	while (y > height) y -= height;
	while (y < 0) y += height;
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

