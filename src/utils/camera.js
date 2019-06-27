
import {wrapAround} from './2dgrid.js';
import {constants} from "./constants";

export function relativeCoords(vect, focus) {
	
	let {width,height} = constants.gameBounds;

	let {x,y} = vect;
	x -= focus.x + width/2;
	y -= focus.y + height/2;

	return wrapAround({x,y});


}