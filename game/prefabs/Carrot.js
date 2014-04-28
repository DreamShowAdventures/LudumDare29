'use strict';

var Carrot = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'carrot', 0);

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

Carrot.prototype = Object.create(Phaser.Sprite.prototype);
Carrot.prototype.constructor = Carrot;

Carrot.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Carrot;
