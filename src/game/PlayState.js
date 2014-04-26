/*global Phaser*/
/*global game*/

/**
 * @author Steve Richey http://www.steverichey.com @stvr_tweets
 */

var playState = {
	init: function() {
		var leftButton;
		var rightButton;
		var bunny;
	},
	preload: function() {
		game.load.image('bunny', 'assets/bunny.png');
	},
	create: function(){
		// initialize physics
		game.physics.startSystem(Phaser.Physics.Arcade);
		
		// configure scaling
		game.stage.backgroundColor = '#333';
		game.scale.width = gameWidth / zoom;
		game.scale.height = gameHeight / zoom;
		game.scale.refresh();
		
		// create the player
		
		bunny = new Bunny(game);
	},
	update: function() {
		
	}
};