(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(384, 768, Phaser.AUTO, 'ludumdare29');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":3,"./states/gameover":4,"./states/menu":5,"./states/play":6,"./states/preload":7}],2:[function(require,module,exports){
'use strict';

var Bunny = function(game, x, y, frame) {
	Phaser.Sprite.call(this, game, x, y, 'bunny', frame);
	// scale up!
	this.smoothed = false;
	this.scale.x = 2;
	this.scale.y = 2;
	// center rotations
	this.anchor.setTo(0.5, 0.5);
	// enable physics
	this.game.physics.arcade.enableBody(this);
	// collide with world bounds
	this.body.collideWorldBounds = true;
	// set body size
	this.body.setSize(16, 28, 0, 0);
	// enable input
	this.cursors = game.input.keyboard.createCursorKeys();
  
};

Bunny.prototype = Object.create(Phaser.Sprite.prototype);
Bunny.prototype.constructor = Bunny;

Bunny.prototype.update = function() {
	this.body.velocity.x = 0;
	
	if (this.cursors.left.isDown) {
		this.body.velocity.x = -50;
	}
	
	if (this.cursors.right.isDown) {
		this.body.velocity.x = 50;
	}
};

module.exports = Bunny;

},{}],3:[function(require,module,exports){

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

},{}],4:[function(require,module,exports){

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

},{}],5:[function(require,module,exports){

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

},{}],6:[function(require,module,exports){
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
},{"../prefabs/bunny":2}],7:[function(require,module,exports){

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
    this.load.image('yeoman', 'assets/yeoman-logo.png');
	this.load.image('bunny', 'assets/bunny.png');
    this.load.image('dirt', 'assets/tileset_dirt.png');

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