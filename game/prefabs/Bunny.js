'use strict';

var Bunny = function(game, x, y, frame) {
	Phaser.Sprite.call(this, game, x, y, 'bunny', frame);
	// scale up!
	this.smoothed = false;
	this.scale.x = 2;
	this.scale.y = 2;
	// center rotations
	this.anchor.setTo(0.5, 0.5);
	// enable physics
	this.game.physics.arcade.enableBody(this);
	// collide with world bounds
	this.body.collideWorldBounds = true;
	// set body size
	this.body.setSize(16, 28, 0, 0);
	// enable input
	this.cursors = game.input.keyboard.createCursorKeys();
	// test test
	// test more
};

Bunny.prototype = Object.create(Phaser.Sprite.prototype);
Bunny.prototype.constructor = Bunny;

Bunny.prototype.update = function() {
	this.body.velocity.x = 0;
	
	if (this.cursors.left.isDown) {
		this.body.velocity.x = -50;
	}
	
	if (this.cursors.right.isDown) {
		this.body.velocity.x = 50;
	}
};

module.exports = Bunny;
