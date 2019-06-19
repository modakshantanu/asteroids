const KEY = {
	W: 87,
	A: 65,
	D: 68,
	SPACE: 32,
 };

 export default class InputManager {

	bindKeys() {
		window.addEventListener('keyup',   this.handleKeys.bind(this, false));
		window.addEventListener('keydown', this.handleKeys.bind(this, true));
	}
	  
	unbindKeys() {
		window.removeEventListener('keyup', this.handleKeys);
		window.removeEventListener('keydown', this.handleKeys);
	}
	constructor() {
		 this.pressedKeys = {left:0,right:0,forward:0,space:0}
	}

	handleKeys(value, e){
		let keys = this.pressedKeys;
		switch (e.keyCode) {
			case KEY.A:
				keys.left  = value;
				break;
			case KEY.D:
				keys.right  = value;
				break;
				case KEY.W:
				keys.forward = value;
				break;
			case KEY.SPACE:
				keys.space  = value;
				break;
				default:
		 }
		 this.pressedKeys = keys;
	 }
 }