/*global Phaser*/
/*global game*/

/**
 * @author Steve Richey http://www.steverichey.com @stvr_tweets
 */

var cursors;

Bunny = function (game) {
	var x = 10;
	var y = 10;
	
	game.physics.enable(this, Phaser.Physics.Arcade);
	game.add.sprite(10, 10, 'bunny')
	
	cursors = game.input.keyboard.createCursorKeys();
	//jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
};

Bunny.prototype.update = function() {
	this.body.velocity.x = 0;
	
	if (cursors.left.isDown) {
		this.body.velocity.x = -50;
	}
	
	if (cursors.left.isDown) {
		this.body.velocity.x = 50;
	}
};