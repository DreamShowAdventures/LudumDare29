'use strict';

var Block = function(game, x, y, frame) {
	Phaser.Sprite.call(this, game, x, y, 'dirt', frame);
	this.frame = game.rnd.integerInRange(0, 14);//
	// scale up!
	this.smoothed = false;
	this.scale.x = 2;
	this.scale.y = 2;
};

Block.prototype = Object.create(Phaser.Sprite.prototype);
Block.prototype.constructor = Block;

Block.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Block;
