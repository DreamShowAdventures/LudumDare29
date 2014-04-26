/*global Phaser*/
/*global game*/

/**
 * @author Steve Richey http://www.steverichey.com @stvr_tweets
 */

var Bunny = function (game, x, y, frame) {
	Phaser.Sprite.call(this, game, x, y, 'bunny', frame);
	
	this.anchor.setTo(0.5, 0.5);
	this.game.physics.arcade.enableBody(this);
	this.body.collideWorldBounds = true;
	this.bunny.body.setSize(32, 32, 0, 0);
	
	this.cursors = game.input.keyboard.createCursorKeys();
	//jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
};

Bunny.prototype = Object.create(Phaser.Sprite.prototype);
Bunny.prototype.constructor = Bunny;

Bunny.prototype.update = function() {
	this.bunny.body.velocity.x = 0;
	
	if (this.cursors.left.isDown) {
		this.bunny.body.velocity.x = -50;
	}
	
	if (this.cursors.right.isDown) {
		this.bunny.body.velocity.x = 50;
	}
};