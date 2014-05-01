'use strict';

var Gauge = function(game, x, y, key) {
	Phaser.Sprite.call(this, game, x, y, 'images');
	this.frameName = key;
	// scale up!
	this.smoothed = false;
	this.scale.x = this.scale.y = 2;
	
	// center rotations
	this.anchor.setTo(0.5, 0.5);
	
	game.add.existing(this);
	
	this.needle = game.add.sprite(x, y, 'images');
	this.needle.frameName = "gauge_needle.png";
	// scale up!
	this.needle.smoothed = false;
	this.needle.scale.x = this.needle.scale.y = 2;
	
	// center rotations
	this.needle.anchor.setTo(0.5, 0.5);
	
	this.minAngle = -90;
	this.maxAngle = 90;
	this.range = this.maxAngle - this.minAngle;
	
	this.needle.angle = this.maxAngle;
  
	this.fixedToCamera = true;
	this.needle.fixedToCamera = true;
};

Gauge.prototype = Object.create(Phaser.Sprite.prototype);
Gauge.prototype.constructor = Gauge;

Gauge.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

Gauge.prototype.updateNeedle = function(value, min, max) {
	if (min < max) {
		if (value > max) {
			this.needle.angle = this.maxAngle;
		} else if (value < min) {
			this.needle.angle = this.minAngle;
		} else {
			this.needle.angle = (value - min) / (max - min) * this.range + this.minAngle;
		}
	} else {
		if (value > min) {
			this.needle.angle = this.minAngle;
		} else if (value < max) {
			this.needle.angle = this.maxAngle;
		} else {
			this.needle.angle = (value - min) / (max - min) * this.range + this.minAngle;
		}
	}
}

module.exports = Gauge;
