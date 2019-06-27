


export function drawDots(ctx, background, focus) {

	
	var offX,offY;
	
	offX = 10 - focus.x%10;
	offY = 10 - focus.y%10;

	ctx.drawImage(background,offX,offY);
}

