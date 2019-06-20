import React from 'react';

import InputManager from './InputManager';
import Ship from './gameComponents/Ship';
import Asteroid from './gameComponents/Asteroid';
import Bullet from './gameComponents/Bullet';
import { distance } from './utils/2dgrid';
import {rotateVector2d} from './utils/2dgrid';
import {randomBetween, checkPolygonIntersection} from './utils/math';

var GameStatus = {
	RUNNING : 1,
	OVER : 2
}

var animationFrameId = null;

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			input: new InputManager(),
			context: null,
			score: 0,
			level: 1,
		}

		
		// Bind member functions
		this.draw = this.draw.bind(this);
		this.resetHandler = this.resetHandler.bind(this);
		this.initLevel = this.initLevel.bind(this);

		// Initialize variables
		this.gameStatus = GameStatus.RUNNING;
		this.asteroids = [];
		this.bullets = [];

		// Initialize level 1
		this.initLevel(1);
		
	}

	componentDidMount() {
		
		this.state.input.bindKeys(); // Setup inputhandler
		const context = this.refs.canvas.getContext('2d'); //Setup Context
		this.setState({context:context});
		animationFrameId = requestAnimationFrame(this.draw); // Start animation
	}

	// clickHandler for the reset button
	resetHandler() {
		
		cancelAnimationFrame(animationFrameId); // Cancel animation frame (in case it is running)
		this.setState({score:0,level:1}) 
		this.initLevel(1); // Place objects for level 1
		this.gameStatus = GameStatus.RUNNING;
		this.refs.reset.blur(); // Take away focus from the reset button
		animationFrameId  = requestAnimationFrame(this.draw); // Start animation again
	}

	// Places the ship and the asteroids required for the level (randomly)
	initLevel(level) {

		this.ship = new Ship({x:50, y:50});
		this.asteroids = [];
		for (let i = 0; i < level; i++) {

			// Generates an asteroid with random position, velocity and shape
			let newX,newY,newDx,newDy,newDr;
			newX = randomBetween(200,500);
			newY = randomBetween(200,500);
			let velMag = randomBetween(1,3);
			({x:newDx,y:newDy} = rotateVector2d({x:0,y:velMag},randomBetween(0,360)));
			newDr = randomBetween(-2,2);
			this.asteroids.push(new Asteroid({x:newX, y:newY, dx: newDx, dy: newDy, dr: newDr}));
		}
		this.bullets = [];
	}


	draw() {

		const ctx = this.state.context;

		ctx.fillStyle = "#FFF";
		ctx.font = "30px Arial";
		ctx.fillRect(0,0,500,500); // Clear screen
		

		// Fire a new bullet if the previous one was fired >300ms ago and space is held down
		if (this.state.input.pressedKeys.space && new Date().getTime() - this.ship.lastFiredTime > 300) {
			this.ship.lastFiredTime = new Date();
			var newDx, newDy;
			newDx =  5 * Math.sin(this.ship.angle*Math.PI/180.0) + this.ship.dx;
			newDy = -5 * Math.cos(this.ship.angle*Math.PI/180.0) + this.ship.dy;
			this.bullets.push(new Bullet({x: this.ship.x, y: this.ship.y, dx: newDx, dy: newDy}));
		}
		
		// Check collisions between asteroids and bullets
		this.bullets.forEach((b,i,bArr) => {
			this.asteroids.forEach((a,j,aArr) => {

				// True if b collides with a
				if (distance(b.x, b.y, a.x, a.y) < b.radius + a.radius && checkPolygonIntersection([{x:b.x,y:b.y}], a.getHitbox())) {

					// Delete bullet, initialize 2 new asteroids in a smaller size class
					bArr.splice(i,1);
					var nextSize = a.sizeCategory-1;
					if (nextSize > 0) {
						let {x:newDx,y:newDy} = rotateVector2d({x:a.dx,y:a.dy},Math.random()*30 + 30);
						aArr.push(new Asteroid({x:a.x,y:a.y,dx:newDx*1.2,dy:newDy*1.2,dr: 6* Math.random() - 3,sizeCategory:nextSize}));
						({x:newDx,y: newDy} = rotateVector2d({x:a.dx,y:a.dy},-(Math.random()*30 + 30)));
						aArr.push(new Asteroid({x:a.x,y:a.y,dx:newDx*1.2,dy:newDy*1.2,dr: 6* Math.random() - 3,sizeCategory:nextSize}));
					}
					aArr.splice(j,1);
					this.setState((state) => ({score:state.score + 10}));
				}
			})
		})

		


		// Collision between Ship and Asteroids
		this.asteroids.forEach((a,i,arr) => {

			// If the ship's hitbox and the asteroids hitbox collides
			if (distance(this.ship.x, this.ship.y, a.x,a.y) < this.ship.radius + a.radius 
			&& checkPolygonIntersection(this.ship.getHitbox(), a.getHitbox())) {				
				
				this.gameStatus = GameStatus.OVER;
				ctx.fillStyle = "#000";
				ctx.fillText("Game Over",200,300);
			}
		})

		// Render all the objects
		this.ship.render(this.state);
		this.asteroids.forEach((e,i,arr) => {
			if (e.delete) {
				arr.splice(i,1);
			} else {
				e.render(this.state);
			}
		});
		this.bullets.forEach((e,i,arr) => {
			if (e.delete) {
				arr.splice(i,1);
			}
			else
				e.render(this.state)
		});

		// If no more asteroids, start the next level
		if(this.asteroids.length === 0) {
			this.initLevel(this.state.level + 1);
			this.setState((state) => ({level:state.level+1}));
		}

		// Show next frame, if GameStatus is running
		if (this.gameStatus === GameStatus.RUNNING)
			animationFrameId = requestAnimationFrame(this.draw);
	}

	componentWillUnmount() {
		this.state.input.unbindKeys();
	}

	render() {
		return (
			<div>
				<h1>Asteroids!</h1>
				<canvas ref = "canvas" width = "500" height = "500"/>
				<div id = "gameStats">
					<button ref = "reset" onClick = {this.resetHandler}>Reset</button>
					<div id = "Score">Score: {this.state.score}</div>
					<div id = "level">Level: {this.state.level}</div>
					<button ref = "debug" onClick = {() => console.log(this.asteroids[0].getHitbox())}>Debug</button>
				</div>
			</div>
		);

	}
  
}

export default App;
