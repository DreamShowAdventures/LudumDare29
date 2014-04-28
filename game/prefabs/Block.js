'use strict';

var Block = function(game, x, y, leftFace, aboveFace) {
	Phaser.Sprite.call(this, game, x, y, 'dirt', 0);
	
	// 0 - bright
	// 1 - med
	
	this.leftFace = leftFace;
	this.topFace = aboveFace;
	this.rightFace = game.rnd.integerInRange(0,1);
	this.bottomFace = game.rnd.integerInRange(0,1);
	
	getFrame(this, this.leftFace, this.topFace, this.rightFace, this.bottomFace);
	
	// scale up! //
	this.smoothed = false;
	this.scale.x = 2;
	this.scale.y = 2;
	
	this.anchor.setTo(0.5, 0.5);
	this.x += this.width / 2;
	this.y += this.height / 2;
};

Block.prototype = Object.create(Phaser.Sprite.prototype);
Block.prototype.constructor = Block;

Block.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

var getFrame = function(block,left,top,right,bottom) {
	var type = left * 1000 + top * 100 + right * 10 + bottom;
	var sum = left + top + right + bottom;
	
	if (sum !== 2) {
		block.frame = sum;
		if (type === 1) block.angle = 180;
		if (type === 10) block.angle = 90;
		if (type === 1000) block.angle = 270;
		if (type === 1011) block.angle = 90;
		if (type === 1101) block.angle = 180;
		if (type === 1110) block.angle = 270;
	} else {
		if (type === 11) {block.frame = 2; block.angle = 90;}
		else if (type === 110) {block.frame = 2;}
		else if (type === 101) {block.frame = 5;}
		else if (type === 1100) {block.frame = 2; block.angle = 270;}
		else if (type === 1010) {block.frame = 5; block.angle = 90;}
		else {block.frame = 2; block.angle = 180;}
	}
};

module.exports = Block;
