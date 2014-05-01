'use strict';

var POWER_DURATION = 450; // how long the powerup lasts, in frames
var NORMAL_SPEED = 100; // speed of the player, normally
var BOOST_SPEED = 200; // speed of the player, boosting
var POWER_SPEED = 300; // speed of the player when carroted
var SLOW_SPEED = 50; // speed when drilling through a rock
var INITIAL_HEALTH = 100; // how much health the player starts with
var REGEN_RATE = 0.1; // how quickly heat dissipates if not drilling through rock or lava
var REGEN_MAX = 100; // the maximum amount of heat that can be regenerated
var NORMAL_TURN = 100; // how fast you turn normally
var POWER_TURN = 200; // how fast you turn if carroty
var MAX_SPEED = 300; // the maximum possible speed from depth
var MAX_BOOST = 50;
var BOOST_REGEN = 0.5;
var BOOST_DRAIN = 0.75;

var Bunny = function(game, x, y, frame) {
	Phaser.Sprite.call(this, game, x, y, 'images', frame);
	// scale up!
	this.smoothed = false;
	this.scale.x = 2;
	this.scale.y = 2;
	// center rotations
	this.anchor.setTo(0.5, 0.5);
	// enable physics
	this.game.physics.arcade.enableBody(this);
	// set body size
	this.body.setSize(12, 14, 0, 12);
	// enable input
	this.cursors = game.input.keyboard.createCursorKeys();
	// wiggle wiggle
	this.baseY = this.y;
	// animate
	this.animations.add('drill', Phaser.Animation.generateFrameNames('drilling', 0, 2, '.png', 4), 12, true);
	this.animations.add('power', Phaser.Animation.generateFrameNames('drilling', 3, 5, '.png', 4), 24, true);
	//this.animations.add('crack', [6, 7, 8], 2, false);
	this.animations.add('overheat', Phaser.Animation.generateFrameNames('drilling', 6, 9, '.png', 4), 2, false);
	this.animations.play('drill');
	// POWER UP
	this.powertimer = 0;
	// moooove
	this.body.velocity.y = NORMAL_SPEED;
	// set initial health
	this.health = INITIAL_HEALTH;
	// set to false to deny input (menu screen)
	this.controllable = true;
	// whether or not a rock is slowing us down
	this.slowed = false;
	this.dead = false;
	this.boost = 0;
	this.boosting = false;
};

Bunny.prototype = Object.create(Phaser.Sprite.prototype);
Bunny.prototype.constructor = Bunny;

Bunny.prototype.update = function() {
	if (this.dead) return;
	
	if (!this.slowed && this.boost < MAX_BOOST) this.boost += BOOST_REGEN;
	
	this.body.velocity.x = 0;
	
	if ((this.cursors.left.isDown || (this.game.input.pointer1.isDown && this.game.input.pointer1.screenX < this.game.width / 2)) && this.controllable) {
		this.body.velocity.x = this.powertimer > 0 ? -POWER_TURN : -NORMAL_TURN;
	}
	
	if ((this.cursors.right.isDown || (this.game.input.pointer1.isDown && this.game.input.pointer1.screenX >= this.game.width / 2)) && this.controllable) {
		this.body.velocity.x = this.powertimer > 0 ? POWER_TURN : NORMAL_TURN;
	}
	
	if (this.body.velocity.x < 0 && this.angle < 22.5) {
		this.body.angularVelocity = 200;
	} else if (this.body.velocity.x > 0 && this.angle > -22.5) {
		this.body.angularVelocity = -200;
	} else if (this.angle != 0){
		if (this.angle < 0) {
			this.body.angularVelocity = 50;
		} else if (this.angle > 0) {
			this.body.angularVelocity = -50;
		}
	}
	
	if (!this.slowed && this.health < REGEN_MAX){
		this.health += REGEN_RATE;
	}
	
	// carrot powerup neglects slowing by rocks
	
	if (this.powertimer > 0)
	{
		this.powertimer--;
		
		if (this.powertimer === 0)
		{
			this.animations.play('drill');
			this.body.velocity.y = NORMAL_SPEED;
		}
		
		this.boosting = false;
	} else if (this.game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && this.boost > 0) {
		this.body.velocity.y = BOOST_SPEED;
		this.boost -= BOOST_DRAIN;
		this.boosting = true;
	} else if (this.slowed) {
		this.body.velocity.y = SLOW_SPEED;
		this.slowed = false;
		this.boosting = false;
	} else {
		this.body.velocity.y = NORMAL_SPEED;
		this.boosting = false;
	}
	
	if (this.x < 0) this.x = 0;
	if (this.x > 320) this.x = 320;
};

Bunny.prototype.powerup = function() {
	this.animations.play('power');
	this.powertimer = POWER_DURATION;
	this.body.velocity.y = POWER_SPEED;
};

Bunny.prototype.hitRock = function(damage) {
	this.slowed = true;
	
	if (!this.powertimer > 0 && !this.boosting) {
		this.health -= damage;
	}
};

Bunny.prototype.updateSpeed = function(amount) {
	NORMAL_SPEED += amount;
	
	if (NORMAL_SPEED > MAX_SPEED) {
		NORMAL_SPEED = MAX_SPEED;
	} else {
		POWER_SPEED += amount * 2;
	}
};

Bunny.prototype.maxHealth = function() {
	return INITIAL_HEALTH;
};

Bunny.prototype.maxBoost = function() {
	return MAX_BOOST;
};

Bunny.prototype.playDead = function() {
	this.body.velocity.x = 0;
	this.body.velocity.y = 0;
	this.body.angularVelocity = 0;
	this.controllable = false;
	this.animations.play('overheat');
	this.dead = true;
};

module.exports = Bunny;
