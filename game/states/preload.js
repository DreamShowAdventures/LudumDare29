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
		
		this.load.atlas('images', 'assets/atlas.png', 'assets/atlas.json');
		this.load.audio('atlas', ['assets/atlas.ogg', 'assets/atlas.mp3'], true);
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