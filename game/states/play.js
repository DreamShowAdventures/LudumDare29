'use strict';

var Bunny = require('../prefabs/bunny');
var Block = require('../prefabs/block');
var Coin = require('../prefabs/coin');

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
		
		this.chunkGroup = this.game.add.group();
		this.nextChunkY = 0;
		this.game.world.bounds.height = 1024;
		this.game.camera.setBoundsToWorld();
		this.lastChunkIndex = 0;
		this.generateChunk();
		this.generateChunk();
		
		// create the dirt emitter
		
		this.dirtEmitter = this.game.add.emitter(32, 64, 1);
		this.dirtEmitter.makeParticles('particles-dirt');
		this.dirtEmitter.start(true, 1000, null, 10);
		
		// create the player
		this.bunny = new Bunny(this.game, 32, 64);
		this.game.add.existing(this.bunny);
		
		// follow the bunny!
		this.game.camera.follow(this.bunny);
		this.game.camera.deadzone = new Phaser.Rectangle(0, 0, 320, 128);
	},
	update: function() {
		if (this.bunny.y > this.chunkGroup.children[this.chunkGroup.children.length - 1].y)
		{
			this.generateChunk();
		}
		
		if (this.chunkGroup.children.length > 0) {
			for (var i = this.chunkGroup.children.length - 1; i >= 0; i--)
			{
				var nextChunk = this.chunkGroup.children[i];
				
				if (nextChunk.y < this.bunny.y - 576)
				{
					this.chunkGroup.remove(nextChunk, true);
				}
			}
		}
		
		this.dirtEmitter.emitX = this.bunny.x;
		this.dirtEmitter.emitY = this.bunny.y;
		this.dirtEmitter.start(true, 1000, null, 10);
	},
	render: function() {
		//this.game.debug.text('Bunny angle: ' + this.bunny.angle, 32, 32, 'rgb(0,0,0)');
		this.game.debug.text('DEPTH: ' + this.bunny.y, 16, 16, 'rgb(0,0,0)');
		this.game.debug.text('CHUNKS: ' + this.chunkGroup.children.length, 16, this.game.height - 12, 'rgb(0,0,0)');
	},
	generateChunk: function() {
		var newChunk = this.chunkGroup.add(this.game.add.group());
		this.lastChunkIndex = this.chunkGroup.getIndex(newChunk);
		newChunk.y = this.nextChunkY;
		
		var xPos = 0;
		var yPos = 0;
		
		for (var i = 0; i < 5 * 8; i++)
		{
			newChunk.add(new Block(this.game, xPos, yPos));
			xPos += 64;
			
			if (xPos >= this.game.width)
			{
				xPos = 0;
				yPos += 64;
			}
		}
		
		newChunk.add(new Coin(	this.game,
								this.game.rnd.integerInRange(0, 64*5),
								this.game.rnd.integerInRange(0, 64*8)));
		
		this.nextChunkY += 64 * 8;
		
		this.game.world.bounds.y = newChunk.y - 8 * 64;
		this.game.camera.bounds.height += 64 * 8;
		this.game.physics.arcade.setBoundsToWorld();
	}
};

module.exports = Play;