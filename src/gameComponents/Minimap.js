import { constants } from "../utils/constants";


export class Minimap {
	

	render(state,ship) {



		let ctx = state.minimapContext;

		ctx.save();
		ctx.fillStyle = "#fff"; // Clearing screen
		ctx.fillRect(0,0,constants.minimapBounds.width, constants.minimapBounds.height);

		ctx.translate(0.5,0.5);
		ctx.fillStyle = "red";
		let x,y ;
		x = ship.pos.x/constants.gameBounds.width * constants.minimapBounds.width;
		y = ship.pos.y/constants.gameBounds.height * constants.minimapBounds.height;
		ctx.beginPath();
		ctx.arc(x,y,2,0,2*Math.PI);
		ctx.fill();
		ctx.restore();
	}
} 