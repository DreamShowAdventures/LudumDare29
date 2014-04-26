'use strict';

var Bunny = require('../prefabs/bunny');

/**
 * @author Steve Richey http://www.steverichey.com @stvr_tweets
 */
 
function Play() {}

Play.prototype = {
	create: function() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		//this.sprite = this.game.add.sprite(this.game.width/2, this.game.height/2, 'yeoman');
		//this.sprite.inputEnabled = true;
		//
		//this.game.physics.arcade.enable(this.sprite);
		//this.sprite.body.collideWorldBounds = true;
		//this.sprite.body.bounce.setTo(1,1);
		//this.sprite.body.velocity.x = this.game.rnd.integerInRange(-500,500);
		//this.sprite.body.velocity.y = this.game.rnd.integerInRange(-500,500);
		
		//this.sprite.events.onInputDown.add(this.clickListener, this);
		
		// configure scaling
		this.game.stage.backgroundColor = '#080';
		/**
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
		
		// create the chunks
		
		this.chunks = this.game.add.group();
		//this.chunks.add(new Chunk(this.game, this));
		
		//for(var i = 0; i < 3; i++)
		//{
			this.chunks.add(new Chunk(this.game, this.chunks));
			//this.chunks.add(new Chunk(this.game,)
		//}
		
		// create the player
		**/
		this.bunny = new Bunny(this.game, 32, 32);
		this.game.add.existing(this.bunny);
		//this.bunny = this.game.add.sprite(0, 0, 'bunny');
	},
	update: function() {
		// hi
	}
};

module.exports = Play;