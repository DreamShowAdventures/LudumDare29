
'use strict';

// load google fonts

var WebFontConfig = {
    google: {
      families: ['Press Start 2P']
    }
};

(function() {
   var wf = document.createElement('script');
   wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
       '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
   wf.type = 'text/javascript';
   wf.async = 'true';
   var s = document.getElementsByTagName('script')[0];
   s.parentNode.insertBefore(wf, s);
 })();
 
 // require global variables

function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(60,0, 'preloader');
    this.asset.anchor.setTo(0, 0.5);
	//this.asset.x = this.game.width / 2;
	this.asset.y = this.game.height / 2;
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
	this.load.spritesheet('drilling', 'assets/drilling.png', 16, 28);
    this.load.spritesheet('dirt', 'assets/tileset_dirt.png', 32, 32);
    this.load.spritesheet('gems', 'assets/gems.png', 15, 13);
    this.load.spritesheet('particles-dirt', 'assets/particles_dirt.png', 4, 4);
	this.load.spritesheet('drilldirt', 'assets/drilldirt.png', 24, 16);
	this.load.spritesheet('particles-tunnel', 'assets/particles_tunnel.png', 6, 6);
	this.load.image('particles-tunnel-solid', 'assets/particles_tunnel_solid.png');
	this.load.image('particles-get', 'assets/particles_get.png');
	this.load.image('title', 'assets/titlescreen.png');
	this.load.image('clouds', 'assets/clouds.png');
	this.load.image('titledrill', 'assets/titledrill.png');
	this.load.image('ground', 'assets/ground.png');
	this.load.spritesheet('chacket', 'assets/chacket.png', 18, 22);
	this.load.spritesheet('rocks-sm', 'assets/rocks_sm.png', 29, 28);
	this.load.spritesheet('rocks-lg', 'assets/rocks_lg.png', 58, 56);
	this.load.spritesheet('lava', 'assets/lava.png', 32, 32);
	this.load.image('carrot', 'assets/carrot.png');
	this.load.image('gauge', 'assets/gauge.png');
	this.load.image('gauge-drill', 'assets/gauge_DRILL.png');
	this.load.image('apple', 'assets/apple.png');
	this.load.image('eaten', 'assets/eaten.png');
	this.load.image('needle', 'assets/gauge_needle.png');
	this.load.image('circle', 'assets/circle.png');
	
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
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
