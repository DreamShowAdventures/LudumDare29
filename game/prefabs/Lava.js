'use strict';

var Lava = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'images');

  
  // scale up!
	this.smoothed = false;
	this.scale.x = this.scale.y = game.rnd.realInRange(2, 4);
	
	// center rotations
	this.anchor.setTo(0.5, 0.5);
	
	this.game.physics.arcade.enableBody(this);
	this.body.setSize(25, 25, 0, 0);
	this.body.rotation = game.rnd.realInRange(-180, 180);
	
	this.animations.add('lava', [37, 38, 39], 1, true);
	this.animations.play('lava');
	
	// automatically kill after 15 seconds
	this.lifespan = 15000;
  
};

Lava.prototype = Object.create(Phaser.Sprite.prototype);
Lava.prototype.constructor = Lava;

module.exports = Lava;