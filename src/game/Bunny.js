/*global Phaser*/
/*global game*/

/**
 * @author Steve Richey http://www.steverichey.com @stvr_tweets
 */

Bunny = function (game) {
	var x = 10;
	var y = 10;
	
	game.physics.enable(this, Phaser.Physics.Arcade);
	game.add.sprite(10, 10, 'bunny')
	
	var leftButton = game.input.keyboard.addKey(Phaser.Keyboard.Left);
	var rightButton = game.input.keyboard.addKey(Phaser.Keyboard.Right);
};

Bunny.prototype.update = function() {
	this.body.velocity.x = 0;
	
	if (leftButton.isDown) {
		this.body.velocity.x = -50;
	}
	
	if (rightButton.isDown) {
		this.body.velocity.x = 50;
	}
};