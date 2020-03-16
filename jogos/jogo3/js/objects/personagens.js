
function Personagens (props) {
    Sprites.call(this, props);
	this.NORMAL = 1;
	this.CRAZY = 2;
	this.LOW = 3;
	this.mode = this.NORMAL;
	this.status = "VISIBLE";
	this.vx = 0;
	this.vy = 0;
}
Personagens.prototype = Object.create(Sprites.prototype);