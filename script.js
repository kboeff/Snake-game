window.onload = () => {
	canvas = document.querySelector("canvas");
	ctx = canvas.getContext("2d");
	document.addEventListener("keydown", keyPush);
	setInterval(game, 1000/15);
}

let xv = 0;
let yv = 0;
let posX = 10;
let posY = 10;
let gridSize = 20;
let tileCount = 20;
let appX = 15;
let appY = 15;
let tail = 5;
const trail = [];

const game = () => {
	posX += xv;
	posY += yv;
	if (posX < 0) {
		posX = tileCount - 1;
	}
	if (posX > tileCount - 1) {
		posX = 0;
	}
	if (posY < 0) {
		posY = tileCount - 1;
	}
	if (posY > tileCount) {
		posY = 0;
	}
	
	ctx.fillStyle="black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
	
	ctx.fillStyle = "lime";
	for (var i = 0; i < trail.length; i++) {
		ctx.beginPath();
		ctx.arc(trail[i].x * gridSize, trail[i].y * gridSize, 9, 0, 2 * Math.PI);
		ctx.fill();
		if (trail[i].x == posX && trail[i].y == posY) {
			tail = 5;
			if (xv !== 0 && yv !== 0) {
				ctx.fillStyle="red";
				ctx.fillRect(0,0,canvas.width,canvas.height);
			}
		}
	}
	
	trail.push({x: posX, y: posY});
	while(trail.length > tail) {
		trail.shift();
	}
	
	if (appX === posX && appY === posY) {
			ctx.fillStyle="green";
			ctx.fillRect(0,0,canvas.width,canvas.height);
			tail++;
			appX = Math.floor(Math.random() * tileCount);
			appY = Math.floor(Math.random() * tileCount);
	}
	
	ctx.fillStyle = "white";
	ctx.beginPath();
	ctx.arc(appX * gridSize, appY * gridSize, 10, 0, 2 * Math.PI);
	ctx.fill();
}
const keyPush = (event) => {
	
	switch(event.keyCode) {
		case 37:
			xv = -1;
			yv = 0;
			break;
		case 38:
			xv = 0;
			yv = -1;
			break;
		case 39:
			xv = 1;
			yv = 0;
			break;
		case 40:
			xv = 0;
			yv = 1;
			break;
	}
}