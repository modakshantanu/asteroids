

export function wrapAround(position) {
	var {x,y} = position;
	if (position.x > 500) x = 0;
	else if (position.x < 0) x = 500;
	if (position.y> 500) y = 0;
	else if (position.y < 0) y = 500;
	return {x,y};
}

export function distance(x1,y1,x2,y2) {
	return Math.sqrt((x1-x2)**2 + (y1-y2)**2);
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