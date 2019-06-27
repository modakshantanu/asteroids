
import {wrapAround} from './2dgrid.js';
import {constants} from "./constants";
import { Vect } from "./Vect";

export function relativeCoords(vect, focus) {
	
	let {width,height} = constants.canvasBounds;

	let {x,y} = vect;
	x = x - focus.x + width/2;
	y = y - focus.y + height/2;

	return wrapAround({x,y},constants.gameBounds);
}