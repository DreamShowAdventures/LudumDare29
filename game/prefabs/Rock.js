'use strict';

var TOUGH_WEIGHT = 0.25; // percentage of rocks that are 'tough'
var LARGE_WEIGHT = 0.25; // percentage of rocks that are large

var Rock = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'rocks-sm', 0);
  
  this.rocksize = game.rnd.realInRange(0,1) < LARGE_WEIGHT ? 1 : 0;
  
  if (this.rocksize === 1) this.loadTexture('rocks-lg',0);
  
  if (game.rnd.realInRange(0,1) < TOUGH_WEIGHT) this.frame = 1;
  
  // scale up!
	this.smoothed = false;
	this.scale.x = this.scale.y = game.rnd.realInRange(2, 4);
	// center rotations
	this.anchor.setTo(0.5, 0.5);
	
	this.game.physics.arcade.enableBody(this);
	if (this.rocksize === 0) {
		this.body.setSize(24, 24, -4, -6);
	} else {
		this.body.setSize(48, 48, -4, -6);
	}
	this.body.rotation = game.rnd.realInRange(-180, 180);
	
	// automatically kill after 15 seconds
	this.lifespan = 15000;
};

Rock.prototype = Object.create(Phaser.Sprite.prototype);
Rock.prototype.constructor = Rock;

Rock.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Rock;
