/*global Phaser*/
/*global game*/

/**
 * @author Steve Richey http://www.steverichey.com @stvr_tweets
 */

Bunny = function (game) {
	var x = 10;
	var y = 10;
	
	this.bunny = game.add.sprite(10, 10, 'bunny');
	game.physics.enable(this.bunny, Phaser.Physics.Arcade);
	//this.bunny.body.collideWorldBounds = true;
	//this.bunny.body.setSize(32, 32, 0, 0);
	
	this.cursors = game.input.keyboard.createCursorKeys();
	//jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
};

Bunny.prototype.update = function() {
	//this.bunny.body.velocity.x = 0;
	
	if (this.cursors.left.isDown) {
		//this.bunny.body.velocity.x = -50;
	}
	
	if (this.cursors.right.isDown) {
		//this.bunny.body.velocity.x = 50;
	}
};