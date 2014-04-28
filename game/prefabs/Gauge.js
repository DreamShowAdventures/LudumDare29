'use strict';

var Gauge = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'gauge', 0);
// scale up!
	this.smoothed = false;
	this.scale.x = this.scale.y = 2;
	
	// center rotations
	this.anchor.setTo(0.5, 0.5);
	
  this.needle = game.add.sprite(x, y, 'needle');
  // scale up!
	this.needle.smoothed = false;
	this.needle.scale.x = this.needle.scale.y = 2;
	
	// center rotations
	this.needle.anchor.setTo(0.5, 0.5);
  
};

Gauge.prototype = Object.create(Phaser.Sprite.prototype);
Gauge.prototype.constructor = Gauge;

Gauge.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Gauge;
