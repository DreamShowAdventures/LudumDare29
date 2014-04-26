/*global Phaser*/
/*global game*/

/**
 * @author Steve Richey http://www.steverichey.com @stvr_tweets
 */

var playState = {
	init: function() {
		
	},
	preload: function() {
		game.load.image('bunny', 'assets/bunny.png');
		game.load.image('bg', 'assets/bg.png');
	},
	create: function(){
		// initialize physics
		game.physics.startSystem(Phaser.Physics.Arcade);
		
		// configure scaling
		game.stage.backgroundColor = '#333';
		
		if (game.context) {
			game.renderer.setSmoothingEnabled(game.context, false);
		} else {
			game.renderer.options.antialias = false;
		}
		
		game.antialias = false;
		game.stage.smoothed = false;
		//game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
		game.scale.width = gameWidth * zoom;
		game.scale.height = gameHeight * zoom;
		game.scale.refresh();
		
		// create the player
		
		this.bunny = new Bunny(game);
		
		// create the background
		
		this.background = this.game.add.sprite(0, 0, 'bg');
	},
	update: function() {
		this.bunny.update();
	}
};