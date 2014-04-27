(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(320, 512, Phaser.AUTO, 'ludumdare29');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":5,"./states/gameover":6,"./states/menu":7,"./states/play":8,"./states/preload":9}],2:[function(require,module,exports){
'use strict';

var Block = function(game, x, y, frame) {
	Phaser.Sprite.call(this, game, x, y, 'dirt', frame);
	this.frame = game.rnd.integerInRange(0, 7);
	// scale up!
	this.smoothed = false;
	this.scale.x = 2;
	this.scale.y = 2;
};

Block.prototype = Object.create(Phaser.Sprite.prototype);
Block.prototype.constructor = Block;

Block.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Block;

},{}],3:[function(require,module,exports){
'use strict';

var Bunny = function(game, x, y, frame) {
	Phaser.Sprite.call(this, game, x, y, 'drilling', frame);
	// scale up!
	this.smoothed = false;
	this.scale.x = 2;
	this.scale.y = 2;
	// center rotations
	this.anchor.setTo(0.5, 0.5);
	// enable physics
	this.game.physics.arcade.enableBody(this);
	// set body size
	this.body.setSize(12, 14, 0, 12);
	// enable input
	this.cursors = game.input.keyboard.createCursorKeys();
	// wiggle wiggle
	this.baseY = this.y;
	// animate
	this.animations.add('drill', [0, 1, 2], 12, true);
	this.animations.play('drill');
	// moooove
	this.body.velocity.y = 100;
};

Bunny.prototype = Object.create(Phaser.Sprite.prototype);
Bunny.prototype.constructor = Bunny;

Bunny.prototype.update = function() {
	this.body.velocity.x = 0;
	
	if (this.cursors.left.isDown) {
		this.body.velocity.x = -100;
	}
	
	if (this.cursors.right.isDown) {
		this.body.velocity.x = 100;
	}
	
	if (this.body.velocity.x < 0 && this.angle < 22.5) {
		this.body.angularVelocity = 200;
	} else if (this.body.velocity.x > 0 && this.angle > -22.5) {
		this.body.angularVelocity = -200;
	} else if (this.angle != 0){
		if (this.angle < 0) {
			this.body.angularVelocity = 100;
		} else if (this.angle > 0) {
			this.body.angularVelocity = -100;
		}
	}
	
	if (this.x < 0) this.x = 0;
	if (this.x > 320) this.x = 320;
};

module.exports = Bunny;

},{}],4:[function(require,module,exports){
'use strict';

var Gem = function(game, x, y, frame) {
	Phaser.Sprite.call(this, game, x, y, 'gems', game.rnd.integerInRange(0,9));
	
	// scale up!
	this.smoothed = false;
	this.scale.x = 2;
	this.scale.y = 2;
	//
	// center rotations
	this.anchor.setTo(0.5, 0.5);
	
	this.game.physics.arcade.enableBody(this);
	this.body.setSize(6, 6, 5, 5);
	
	this.angle = game.rnd.realInRange(-180, 180);
};

Gem.prototype = Object.create(Phaser.Sprite.prototype);
Gem.prototype.constructor = Gem;

Gem.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Gem;

},{}],5:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],6:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],7:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {
	// todo
  },
  create: function() {
    // todo
  },
  update: function() {
    // todo
  }
};

module.exports = Menu;

},{}],8:[function(require,module,exports){
'use strict';

// static variables

var GEM_FREQUENCY = 2; // per block

var Bunny = require('../prefabs/bunny');
var Block = require('../prefabs/block');
var Gem = require('../prefabs/gem');

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
		this.game.world.bounds.height = 1024;
		this.game.camera.setBoundsToWorld();
		this.lastChunkIndex = 0;
		this.gems = this.game.add.group();
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
		this.tunnel.gravity = 0;//
		this.tunnel.start(false, 750, 25);
		
		// create the tunnel border
		
		this.tunnelborder = this.game.add.emitter(32, 64, 200);
		this.tunnelborder.makeParticles('particles-tunnel', [0,1,2], 200, false, false);
		this.tunnelborder.setXSpeed(0, 0);
		this.tunnelborder.setYSpeed(0, 0);
		this.tunnelborder.setRotation(0, 0);
		this.tunnelborder.gravity = 0;
		this.tunnelborder.start(false, 750, 15);
		
		// create the player
		this.bunny = new Bunny(this.game, 32, 64);
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
	},
	update: function() {
		// collect gems
		this.game.physics.arcade.overlap(this.bunny, this.gems, this.collectGems, null, this);
		
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
	},
	render: function() {
		//this.game.debug.text('Bunny angle: ' + this.bunny.angle, 32, 32, 'rgb(0,0,0)');
		this.game.debug.text('DEPTH: ' + Math.round(this.bunny.y), 8, 16, 'rgb(255,255,255)');
		this.game.debug.text('CASH: $' + this.cash, 8, 32);
		this.game.debug.text('CHUNKS: ' + this.chunkGroup.children.length, 8, this.game.height - 12, 'rgb(0,0,0)');
		//this.game.debug.body(this.bunny);
		//this.game.debug.bodyInfo(this.bunny, 16, 32);
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
		
		for (i = 0; i < GEM_FREQUENCY; i++)
		{
			this.gems.add(new Gem(	this.game,
									this.game.rnd.integerInRange(0, 64*5),
									this.game.rnd.integerInRange(this.nextChunkY, this.nextChunkY+64*8)));
		}
		
		this.nextChunkY += 64 * 8;
		
		this.game.world.bounds.y = newChunk.y - 8 * 64;
		this.game.camera.bounds.height += 64 * 8;
		this.game.physics.arcade.setBoundsToWorld();
	},
	collectGems: function(player, gem) {
		this.getEmitter.emitX = gem.x;
		this.getEmitter.emitY = gem.y;
		this.cash += gem.frame + 1;
		this.gems.remove(gem, true);
		this.getEmitter.start(true, 1000, null, 25);
	}
};

module.exports = Play;
},{"../prefabs/block":2,"../prefabs/bunny":3,"../prefabs/gem":4}],9:[function(require,module,exports){

'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
	this.load.spritesheet('drilling', 'assets/drilling.png', 16, 28);
    this.load.spritesheet('dirt', 'assets/tileset_dirt.png', 32, 32);
    this.load.image('coin', 'assets/coin.png');
    this.load.spritesheet('gems', 'assets/gems.png', 15, 13);
    this.load.spritesheet('particles-dirt', 'assets/particles_dirt.png', 4, 4);
	this.load.spritesheet('drilldirt', 'assets/drilldirt.png', 24, 16);
	this.load.spritesheet('particles-tunnel', 'assets/particles_tunnel.png', 6, 6);
	this.load.image('particles-tunnel-solid', 'assets/particles_tunnel_solid.png');
	this.load.image('particles-get', 'assets/particles_get.png');
  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('play');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])