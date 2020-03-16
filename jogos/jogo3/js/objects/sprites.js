function Sprites (props){
	let { sourceX ,sourceY ,width ,height ,x ,y } = props
	this.sourceX = sourceX;
	this.sourceY = sourceY;
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.vx = 5;
	this.vy = 0;
	this.status = "VISIBLE";
}

Sprites.prototype.centerX = function(){
	return this.x + (this.width/2);
}

Sprites.prototype.centerY = function(){
	return this.y + (this.height/2);
}

Sprites.prototype.halfWidth = function(){
	return this.width/2;
}

Sprites.prototype.halfHeight = function(){
	return this.height/2;
}