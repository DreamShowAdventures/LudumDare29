'use strict';

var TOUGH_WEIGHT = 0.25;

var Rock = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'rocks-sm', 0);
  
  this.rocksize = game.rnd.pick([0,1]);
  
  if (this.rocksize !== 0) this.loadTexture('rocks-lg',0);
  
  if (game.rnd.realInRange(0,1) < TOUGH_WEIGHT) this.frame = 1;
  
  // scale up!
	this.smoothed = false;
	this.scale.x = 2;
	this.scale.y = 2;
	// center rotations
	this.anchor.setTo(0.5, 0.5);
	this.angle = game.rnd.realInRange(-180, 180);
	
	// automatically kill after 15 seconds
	this.lifespan = 15000;
};

Rock.prototype = Object.create(Phaser.Sprite.prototype);
Rock.prototype.constructor = Rock;

Rock.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Rock;
