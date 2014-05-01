'use strict';

var TOUGH_WEIGHT = 0.25; // percentage of rocks that are 'tough'
var LARGE_WEIGHT = 0.25; // percentage of rocks that are large

var Rock = function(game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'images', 0);
	
	this.large = game.rnd.realInRange(0,1) < LARGE_WEIGHT;
	this.tough = game.rnd.realInRange(0,1) < TOUGH_WEIGHT;
	
	if(this.large) {
		if (this.tough) {
			this.frameName = "rocks_lg0001.png";
		} else {
			this.frameName = "rocks_lg0000.png";
		}
	} else {
		if (this.tough) {
			this.frameName = "rocks_sm0001.png";
		} else {
			this.frameName = "rocks_sm0000.png";
		}
	}
	
	// scale up!
	this.smoothed = false;
	this.scale.x = this.scale.y = game.rnd.realInRange(2, 4);
	// center rotations
	this.anchor.setTo(0.5, 0.5);
	
	this.game.physics.arcade.enableBody(this);
	if (!this.large) {
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

module.exports = Rock;