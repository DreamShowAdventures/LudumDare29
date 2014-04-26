/*global Phaser*/
/*global game*/

/**
 * @author Steve Richey http://www.steverichey.com @stvr_tweets
 */

var playState = {
	init: function() {
		
	},
	preload: function() {
		this.game.load.image('bunny', 'assets/bunny.png');
		this.game.load.image('bg', 'assets/bg.png');
	},
	create: function(){
		// initialize physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		
		// configure scaling
		this.game.stage.backgroundColor = '#333';
		
		if (this.game.context) {
			this.game.renderer.setSmoothingEnabled(game.context, false);
		} else {
			this.game.renderer.options.antialias = false;
		}
		
		this.game.antialias = false;
		this.game.stage.smoothed = false;
		//game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
		this.game.scale.width = gameWidth * zoom;
		this.game.scale.height = gameHeight * zoom;
		this.game.scale.refresh();
		
		// create the background
		
		this.background = this.game.add.sprite(0, 0, 'bg');
		
		// create the player
		
		this.bunny = new Bunny(this.game, 10, 10);
		this.game.add.existing(this.bunny);
	},
	update: function() {
		this.bunny.update();
	}
};