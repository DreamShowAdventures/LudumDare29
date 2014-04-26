'use strict';

var Bunny = function(game, x, y, frame) {
	Phaser.Sprite.call(this, game, x, y, 'drilling', frame);
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
	// wiggle wiggle
	this.baseY = this.y;
	// animate
	this.animations.add('drill', [0, 1, 2], 12, true);
	this.animations.play('drill');
};

Bunny.prototype = Object.create(Phaser.Sprite.prototype);
Bunny.prototype.constructor = Bunny;

Bunny.prototype.update = function() {
	this.body.velocity.x = 0;
	
	if (this.cursors.left.isDown) {
		this.body.velocity.x = -100;
	}
	
	if (this.cursors.right.isDown) {
		this.body.velocity.x = 100;
	}
	
	if (this.body.velocity.x < 0 && this.angle < 22.5) {
		this.body.angularVelocity = 200;
	} else if (this.body.velocity.x > 0 && this.angle > -22.5) {
		this.body.angularVelocity = -200;
	} else {
		this.body.angularVelocity = 0;
	}
	
	// wiggle wiggle!!
	
	if (this.y === this.baseY) {
		this.y = this.baseY + 2;
	} else {
		this.y = this.baseY;
	}
};

module.exports = Bunny;
