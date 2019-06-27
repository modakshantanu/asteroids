


export function drawDots(ctx, background, focus) {

	
	var offX,offY;
	
	offX = 20 - focus.x%20;
	offY = 20 - focus.y%20;

	ctx.drawImage(background,offX,offY);
}

