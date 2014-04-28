'use strict';

var Gem = function(game, x, y, frame) {
	Phaser.Sprite.call(this, game, x, y, 'gems', game.rnd.integerInRange(0,9));
	
	// scale up!
	this.smoothed = false;
	this.scale.x = 2;
	this.scale.y = 2;
	//
	// center rotations
	this.anchor.setTo(0.5, 0.5);
	
	this.game.physics.arcade.enableBody(this);
	this.body.setSize(8, 8, 0, 0);
	this.body.rotation = game.rnd.realInRange(-180, 180);
	
	// automatically kill after 15 seconds
	this.lifespan = 15000;
};

Gem.prototype = Object.create(Phaser.Sprite.prototype);
Gem.prototype.constructor = Gem;

Gem.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Gem;
