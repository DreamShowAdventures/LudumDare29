'use strict';

// static variables

var GEM_FREQUENCY = 5; // max per chunk
var GEM_WEIGHT = 0.5; // chance of any one gem spawning, 1 = 100%
var ROCK_FREQUENCY = 4; // max per chunk
var ROCK_WEIGHT = 0.5; // chance of any one rock spawning
var CARROT_FREQUENCY = 1; //max per chunk
var CARROT_WEIGHT = 0.25; // chance of any one carrot spawning
var LAVA_FREQUENCY = 2; // max per chunk
var LAVA_WEIGHT = 0.1; //chance of any one lava spawning
var INCREASE_PER_CHUNK = 1; // how much faster to go per chunk
var LIGHT_ROCK_DAMAGE = 0.5; // how much damage a light rock does
var DARK_ROCK_DAMAGE = 1.0; // how much damage a dark rock does
var LAVA_DAMAGE = 2.5; // how much damage lava does, per frame

// one chunk is equal to the screen size. so every time you travel one screen height, you enter a new chunk

var Block = require('../prefabs/Block.js');
var Bunny = require('../prefabs/Bunny.js');
var Gem = require('../prefabs/Gem.js');
var Rock = require('../prefabs/Rock.js');
var Carrot = require('../prefabs/Carrot.js');
var Lava = require('../prefabs/Lava.js');
var Gauge = require('../prefabs/Gauge.js');

/**
 * @author Steve Richey http://www.steverichey.com @stvr_tweets
 */
 
function Play() {}

Play.prototype = {
	create: function() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		
		this.game.stage.backgroundColor = '#000';
		
		// initialize game variables
		this.cash = 0;
		
		this.chunkGroup = this.game.add.group();
		this.nextChunkY = 0;
		this.game.world.bounds.x = 0;
		this.game.world.bounds.height = 1024;
		this.game.camera.setBoundsToWorld();
		this.lastChunkIndex = 0;
		this.tephra = this.game.add.group();
		this.rocks = this.game.add.group();
		this.gems = this.game.add.group();
		this.carrots = this.game.add.group();
		this.lastChunk = null;
		this.chunkIndex = 0;
		this.generateChunk();
		this.generateChunk();
		
		// create the dirt emitter
		
		this.dirtEmitter = this.game.add.emitter(32, 64, 500);
		this.dirtEmitter.makeParticles('particles-dirt', [0,1,2,3], 500, false, false);
		this.dirtEmitter.setYSpeed(-5, 200);
		this.dirtEmitter.setRotation(0, 0);
		this.dirtEmitter.start(false, 500, 25);
		
		// create the dirt effect
		
		this.drilldirt = this.game.add.sprite(32, 64, 'drilldirt');
		this.drilldirt.smoothed = false;
		this.drilldirt.scale.x = 2;
		this.drilldirt.scale.y = 2;
		this.drilldirt.anchor.setTo(0.5, -0.1);
		this.drilldirt.animations.add('drill', [0,1,2], 16, true);
		this.drilldirt.animations.play('drill');
		
		// create the tunnel
		
		this.tunnel = this.game.add.emitter(32, 64, 100);
		this.tunnel.makeParticles('particles-tunnel-solid', 0, 100, false, false);
		this.tunnel.setXSpeed(0,0);
		this.tunnel.setYSpeed(0,0);
		this.tunnel.gravity = 0;
		this.tunnel.start(false, 2000, 25);
		
		// create the tunnel border
		
		this.tunnelborder = this.game.add.emitter(32, 64, 200);
		this.tunnelborder.makeParticles('particles-tunnel', [0,1,2], 200, false, false);
		this.tunnelborder.setXSpeed(0, 0);
		this.tunnelborder.setYSpeed(0, 0);
		this.tunnelborder.setRotation(0, 0);
		this.tunnelborder.gravity = 0;
		this.tunnelborder.start(false, 2000, 15);
		
		// death fx
		this.deathfade = this.game.add.bitmapData(this.game.width, this.game.height);
		this.deathfade.context.fillStyle = '#000000';
		this.deathfade.context.fillRect(0, 0, this.game.width, this.game.height);
		this.deathfadesprite = this.game.add.sprite(0, 0, this.deathfade);
		this.deathfadesprite.fixedToCamera = true;
		this.deathfadesprite.alpha = 0;
		this.deathfadesprite.kill();
		
		this.circle = this.game.add.sprite(0,0,'circle');
		this.circle.alpha = 0.5;
		this.circle.anchor.setTo(0.5,0.5);
		this.circle.kill();
		
		// create the player
		this.bunny = new Bunny(this.game, 0, 0);
		this.bunny.x = this.game.width / 2;
		this.bunny.y = -this.bunny.height;
		this.game.add.existing(this.bunny);
		
		// pickup effect
		this.getEmitter = this.game.add.emitter();
		this.getEmitter.makeParticles('particles-get');
		this.getEmitter.gravity = 0;
		this.getEmitter.setAlpha(0, 1);
		this.getEmitter.setXSpeed(-25, 25);
		this.getEmitter.setYSpeed(-25, 25);
		this.getEmitter.bounce.set(0.5, 0.5);
		
		// follow the bunny!
		this.game.camera.follow(this.bunny);
		this.game.camera.deadzone = new Phaser.Rectangle(0, 0, 320, 128);
		
		this.fade = this.game.add.bitmapData(this.game.width, this.game.height);
		this.fade.context.fillStyle = '#000000';
		this.fade.context.fillRect(0, 0, this.game.width, this.game.height);
		this.fadesprite = this.game.add.sprite(0, 0, this.fade);
		this.fadesprite.alpha = 1;
		this.game.add.tween(this.fadesprite).to({alpha:0}, 400, null, true);
		
		// dead flag
		this.dead = false;
		
		// almost dead flag
		this.beeping = false;
		
		// JAMS
		this.music = this.game.add.sound('coral', 0.75, true);
		this.music.play();
		this.soundcarrot = this.game.add.sound('carrot');
		this.soundgem = this.game.add.sound('gem');
		this.soundouch = this.game.add.sound('ouch');
		this.soundbeep = this.game.add.sound('beep');
		
		// HUD
		this.heatgauge = new Gauge(this.game, this.game.width - 48, this.game.height - 48, 'gauge'); // adds itself to the game
		this.powergauge = new Gauge(this.game, 48, this.game.height - 48, 'gauge-drill'); // same
		
		this.depthtext = this.game.add.text(96,this.game.height - 48,'0m', {fill: 'white', font: '12pt "Press Start 2P"'});
		this.depthtext.fixedToCamera = true;
		
		this.cashtext = this.game.add.text(96,this.game.height - 24,'$0', {fill: 'white', font: '12pt "Press Start 2P"'});
		this.cashtext.fixedToCamera = true;
	},//
	update: function() {
		if (!this.dead) {
			// collect gems
			this.game.physics.arcade.overlap(this.bunny, this.gems, this.collectGems, null, this);
			
			// collect carrots
			this.game.physics.arcade.overlap(this.bunny, this.carrots, this.collectCarrot, null, this);
			
			// rocks
			this.game.physics.arcade.overlap(this.bunny, this.rocks, this.hitRock, null, this);
			
			// lava
			this.game.physics.arcade.overlap(this.bunny, this.tephra, this.hitLava, null, this);
			
			// generate a new chunk if we're about to run out
			
			if (this.bunny.y > this.chunkGroup.children[this.chunkGroup.children.length - 1].y)
			{
				this.generateChunk();
			}
			
			// garbage collect old chunks
			
			var i = this.chunkGroup.children.length;
			
			while (i >= 0)
			{
				if (this.chunkGroup.children[i])
				{
					if (this.chunkGroup.children[i].y < this.game.camera.y - 8 * 64)
					{
						this.chunkGroup.remove(this.chunkGroup.children[i], false);
					}
				}
				
				i--;
			}
			
			// update dirt particle position
			
			this.dirtEmitter.emitX = this.bunny.x;
			this.dirtEmitter.emitY = this.bunny.y + 24;
			
			// update drill dirt effect position/angle
			
			this.drilldirt.x = this.bunny.x;
			this.drilldirt.y = this.bunny.y;
			this.drilldirt.angle = this.bunny.angle;
			
			// update tunnel position/angle
			
			this.tunnel.emitX = this.bunny.x;
			this.tunnel.emitY = this.bunny.y;
			this.tunnel.setRotation(this.bunny.angle, this.bunny.angle);
			
			// update the tunnel border
			
			this.tunnelborder.emitX = this.game.rnd.pick(
				[	this.bunny.x - this.bunny.width / 2 + 1, 
					this.bunny.x - this.bunny.width / 2 + 2,
					this.bunny.x - this.bunny.width / 2 + 3,
					this.bunny.x + this.bunny.width / 2 - 1,
					this.bunny.x + this.bunny.width / 2 - 2,
					this.bunny.x + this.bunny.width / 2 - 3 ]);
			this.tunnelborder.emitY = this.bunny.y;
			
			// update heat
			this.heatgauge.updateNeedle(this.bunny.health, this.bunny.maxHealth(), 0);
			
			// update booost
			
			this.powergauge.updateNeedle(this.bunny.boost, 0, this.bunny.maxBoost());
			
			if (this.bunny.health < 30 && !this.beeping) {
				// play beeping sound
				if (!this.soundbeep.isPlaying) this.soundbeep.play('', 0, 0.1, true);
				this.beeping = true;
			} else if (this.beeping && this.bunny.health > 30) {
				if (this.soundbeep.isPlaying) this.soundbeep.stop();
				this.beeping = false;
			}
			
			// update text
			this.depthtext.text = this.bunny.y > 0 ? Math.round(this.bunny.y/10) + "m" : "0m";
			this.cashtext.text = "$" + this.cash;
			
			if (this.bunny.health < 0) {
				this.dead = true;
				this.bunny.playDead();
				this.deathfadesprite.revive();
				//this.deathfadesprite.x = this.game.camera.x;
				//this.deathfadesprite.y = this.game.camera.y;
				this.circle.x = this.bunny.x;
				this.circle.y = this.bunny.y;
				this.circle.revive();
				this.game.add.tween(this.deathfadesprite).to({alpha:1}, 500, null, true);
				this.game.add.tween(this.circle).to({alpha:0}, 500, null, true);
				this.game.add.tween(this.circle.scale).to({x:16}, 250, null, true);
				this.game.add.tween(this.circle.scale).to({y:16}, 500, null, true);
				this.drilldirt.kill();
				this.dirtEmitter.kill();
				this.soundbeep.stop();
				this.music.stop();
				this.game.add.tween(this.heatgauge).to({alpha:0}, 500, null, true);
				this.game.add.tween(this.powergauge).to({alpha:0}, 500, null, true);
				this.game.add.tween(this.heatgauge.needle).to({alpha:0}, 500, null, true);
				this.game.add.tween(this.powergauge.needle).to({alpha:0}, 500, null, true);
				this.game.add.tween(this.depthtext).to({alpha:0}, 500, null, true);
				this.game.add.tween(this.cashtext).to({alpha:0}, 500, null, true);
				
				this.gameover = this.game.add.text(32, 192,'GAME\nOVER', {fill: 'red', font: '48pt "Press Start 2P"'});
				this.gameover.fixedToCamera = true;
				
				this.depthyo = this.game.add.text(32, 318, 'DEPTH ' + this.depthtext.text, {fill: 'white', font: '12pt "Press Start 2P"'});
				this.depthyo.fixedToCamera = true;
				
				this.cashyo = this.game.add.text(32, 336, 'CASH ' + this.cashtext.text, {fill: 'white', font: '12pt "Press Start 2P"'});
				this.cashyo.fixedToCamera = true;
				
				this.pressspace = this.game.add.text(32, 400, 'F5 TO RETRY', {fill: 'white', font: '12pt "Press Start 2P"'});
				this.pressspace.fixedToCamera = true;
				
				this.deathtunes = this.game.add.sound('gameover', 0.2);
				//this.deathtunes.play('', 0, 0.2);
				
				this.boom = this.game.add.sound('boom');
				this.boom.onStop.add(function(){this.deathtunes.play('', 0, 0.2);}, this);
				this.boom.play();
			}
		} else {
			//if(this.game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
			//{
			//	this.deathtunes.stop();
			//	this.game.state.start('menu');
			//}
		}
	},
	generateChunk: function() {
		var newChunk = this.chunkGroup.add(this.game.add.group());
		newChunk.y = this.nextChunkY;
		
		var xPos = 0;
		var yPos = 0;
		var aboveFace = 0;
		var leftFace = 0;
		
		for (var i = 0; i < 5 * 8; i++)
		{
			if (i !== 0 && i % 5 !== 0) {
				leftFace = newChunk.children[i-1].rightFace;
			} else {
				leftFace = this.game.rnd.integerInRange(0,1);
			}
			
			if (i > 4) {
				aboveFace = newChunk.children[i-5].bottomFace;
			} else if (this.chunkGroup.children.length > 1) {
				aboveFace = this.lastChunk.children[this.lastChunk.children.length - (5-i)].bottomFace;
			} else {
				aboveFace = this.game.rnd.integerInRange(0,1);
			}
			
			newChunk.add(new Block(this.game, xPos, yPos, leftFace, aboveFace));
			xPos += 64;
			
			if (xPos >= this.game.width)
			{
				xPos = 0;
				yPos += 64;
			}
		}
		
		for (i = 0; i < GEM_FREQUENCY; i++)
		{
			if(chanceRoll(this.game, GEM_WEIGHT))
				this.gems.add(new Gem(	this.game,
										this.game.rnd.integerInRange(0, 64*5),
										this.game.rnd.integerInRange(this.nextChunkY, this.nextChunkY+64*8)));
		}
		
		if (this.chunkIndex != 0) {// first chunk won't generate rocks, carrots, or lava
			for (i = 0; i < ROCK_FREQUENCY; i++)
			{
				if(chanceRoll(this.game, ROCK_WEIGHT)){
					var newRock;
					do { // try to prevent overlapping rocks, kinda
						newRock = new Rock(this.game, this.game.rnd.integerInRange(0, 64*5), this.game.rnd.integerInRange(this.nextChunkY, this.nextChunkY+64*8));
					} while (this.game.physics.arcade.overlap(newRock, this.rocks));
					
					this.rocks.add(newRock);
				}
			}
			
			for (i = 0; i < CARROT_FREQUENCY; i++)
			{
				if(chanceRoll(this.game, CARROT_WEIGHT))
					this.carrots.add(new Carrot(	this.game,
													this.game.rnd.integerInRange(0, 64*5),
													this.game.rnd.integerInRange(this.nextChunkY, this.nextChunkY+64*8)));
			}
			
			for (i = 0; i < LAVA_FREQUENCY; i++)
			{
				if(chanceRoll(this.game, LAVA_WEIGHT))
					this.tephra.add(new Lava(	this.game,
												this.game.rnd.integerInRange(0, 64*5),
												this.game.rnd.integerInRange(this.nextChunkY, this.nextChunkY+64*8)));
			}
		}
		
		this.nextChunkY += 64 * 8;
		this.lastChunkIndex = this.chunkGroup.getIndex(newChunk);
		this.lastChunk = newChunk;
		this.chunkIndex++;
		
		this.game.world.bounds.y = newChunk.y - 8 * 64;
		this.game.camera.bounds.height += 64 * 8;
		this.game.physics.arcade.setBoundsToWorld();
		
		// FASTER FASTER BUNNY
		if (this.bunny) {
			this.bunny.updateSpeed(INCREASE_PER_CHUNK);
		}
	},
	collectGems: function(player, gem) {
		this.getEmitter.emitX = gem.x;
		this.getEmitter.emitY = gem.y;
		this.cash += gem.value();
		this.gems.remove(gem, true);
		this.getEmitter.start(true, 1000, null, 25);
		
		this.soundgem.play();
	},
	collectCarrot: function(player, carrot) {
		this.getEmitter.emitX = carrot.x;
		this.getEmitter.emitY = carrot.y;
		this.carrots.remove(carrot, true);
		this.getEmitter.start(true, 1000, null, 25);
		
		this.bunny.powerup();
		this.soundcarrot.play();
	},
	hitRock: function(player, rock) {
		if (rock.frame === 1 )
		{
			this.bunny.hitRock(DARK_ROCK_DAMAGE);
		}
		else
		{
			this.bunny.hitRock(LIGHT_ROCK_DAMAGE);
		}
		
		this.soundouch.play();
	},
	hitLava: function(player, lava) {
		this.bunny.hitRock(LAVA_DAMAGE);
		
		this.soundouch.play();
	}
};

var chanceRoll = function(game,chanceAsFloat) {
	return (game.rnd.realInRange(0,1) < chanceAsFloat);
};

module.exports = Play;