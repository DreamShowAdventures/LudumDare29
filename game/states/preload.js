'use strict';

function Preload() {
	this.loadbar = null;
	this.ready = false;
	this.waiting = false;
};

Preload.prototype = {
	preload: function() {
		this.loadbar = this.add.sprite(60, 0, 'preloader');
		this.loadbar.anchor.setTo(0, 0.5);
		this.loadbar.y = this.game.height / 2;
		this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
		this.load.setPreloadSprite(this.loadbar);
		
		this.load.image('particles-tunnel-solid', 'assets/particles_tunnel_solid.png');
		this.load.image('particles-get', 'assets/particles_get.png');
		this.load.image('title', 'assets/titlescreen.png');
		this.load.image('clouds', 'assets/clouds.png');
		this.load.image('titledrill', 'assets/titledrill.png');
		this.load.image('ground', 'assets/ground.png');
		this.load.image('carrot', 'assets/carrot.png');
		this.load.image('gauge', 'assets/gauge.png');
		this.load.image('gauge-drill', 'assets/gauge_DRILL.png');
		this.load.image('apple', 'assets/apple.png');
		this.load.image('eaten', 'assets/eaten.png');
		this.load.image('needle', 'assets/gauge_needle.png');
		this.load.image('circle', 'assets/circle.png');
		
		this.load.spritesheet('chacket', 'assets/chacket.png', 18, 22);
		this.load.spritesheet('rocks-sm', 'assets/rocks_sm.png', 29, 28);
		this.load.spritesheet('rocks-lg', 'assets/rocks_lg.png', 58, 56);
		this.load.spritesheet('lava', 'assets/lava.png', 32, 32);
		this.load.spritesheet('drilling', 'assets/drilling.png', 16, 28);
		this.load.spritesheet('dirt', 'assets/tileset_dirt.png', 32, 32);
		this.load.spritesheet('gems', 'assets/gems.png', 15, 13);
		this.load.spritesheet('particles-dirt', 'assets/particles_dirt.png', 4, 4);
		this.load.spritesheet('drilldirt', 'assets/drilldirt.png', 24, 16);
		this.load.spritesheet('particles-tunnel', 'assets/particles_tunnel.png', 6, 6);
		
		this.load.audio('double', 'assets/double_track.ogg', true);
		this.load.audio('coral', 'assets/coral_reef.ogg', true);
		this.load.audio('carrot', 'assets/carrot.ogg', true);
		this.load.audio('gem', 'assets/gem.ogg', true);
		this.load.audio('ouch', 'assets/ouch.ogg', true);
		this.load.audio('jump', 'assets/jump.ogg', true);
		this.load.audio('beep', 'assets/beep.ogg', true);
		this.load.audio('wind', 'assets/wind.ogg', true);
		this.load.audio('gameover', 'assets/gameover.ogg', true);
		this.load.audio('boom', 'assets/boom.ogg', true);
	},
	create: function() {
		this.loadbar.cropEnabled = false;
	},
	update: function() {
		if(!!this.ready && !this.waiting) {
			// A time delay is necessary to get the google webfonts to work.
			// This is a known issue with Phaser.
			this.game.time.events.add(1000, function(){this.game.state.start('menu');}, this);
			this.game.add.tween(this.loadbar).to({alpha:0}, 1000, Phaser.Easing.Quadratic.InOut, true);
			this.waiting = true;
		}
	},
	onLoadComplete: function() {
		this.ready = true;
	}
};

module.exports = Preload;