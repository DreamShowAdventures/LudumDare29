
'use strict';
var Bunny = require('../prefabs/Bunny.js');

function Menu() {}

Menu.prototype = {
  create: function() {
	this.game.stage.backgroundColor = '#5FB0F3';
	
	var language = window.navigator.userLanguage || window.navigator.language;
	language = language.substring(0,2);
	
	var str_sub = '';
	var str_prs = '';
	var small = false;
	//language = 'fr';
	if (language === 'zh') {str_sub = "\u94BB\u5154\u5B50"; str_prs = "\u6309\u7A7A\u683C";}
	else if (language === 'es') {str_sub = "Conejito de\nPerforaci\u00F3n"; str_prs = "Presione Inicio"; small = true;}
	else if (language === 'fr') {str_sub = "FORAGE\nLAPIN"; str_prs = "Espace Presse"; small = true;}
	else if (language === 'de') {str_sub = "BOHRER\nHASE"; str_prs = "Presseraum"; small = true;}
	else if (language === 'it') {str_sub = "TRAPANO\nCONIGLIO"; str_prs = "Spazio Stampa"; small = true;}
	else if (language === 'ja') {str_sub = "\u30C9\u30EA\u30EB\u30D0\u30CB\u30FC"; str_prs = "\u30D7\u30EC\u30B9\u958B\u59CB"; small = true;}
	else { str_sub = 'DRILL\nBUNNY'; str_prs = 'Press Space!';}
	
    this.bg = this.game.add.sprite(0, 216, 'title');
	this.bg.smoothed = false;
	this.bg.scale.x = 2;
	this.bg.scale.y = 2;
	
	this.clouds = this.game.add.sprite(0, 24, 'clouds');
	this.clouds.smoothed = false;
	this.clouds.scale.x = 2;
	this.clouds.scale.y = 2;
	
	// bunny
	
	this.bun = this.game.add.sprite(32,this.game.height - 102,'chacket');
	this.bun.smoothed = false;
	this.bun.scale.x = 2;
	this.bun.scale.y = 2;
	this.bun.animations.add('sleep', [0,1], 1, true);
	this.bun.animations.add('wake', [2]);
	this.bun.animations.add('walk', [3,4], 12, true);
	this.bun.animations.play('sleep');
	
	// drill
	
	this.drill = this.game.add.sprite(146,this.game.height - 82, 'titledrill');
	this.drill.smoothed = false;
	this.drill.scale.x = 2;
	this.drill.scale.y = 2;
	
	// real bun
	
	this.bunny = new Bunny(this.game, 32, 64);
	this.game.add.existing(this.bunny);
	this.bunny.x = 160;
	this.bunny.y = 442;
	this.bunny.controllable = false;
	this.bunny.kill();
	
	// ground
	
	this.ground = this.game.add.sprite(0, this.game.height - 64, 'ground');
	this.ground.smoothed = false;
	this.ground.scale.x = 2;
	this.ground.scale.y = 2;
	
	this.title = this.game.add.text(8,8,'Chacket\nValleyparker:', {fill : 'red', font: '18pt "Press Start 2P"', align: 'center'});
	
	if (small) {
		this.sub = this.game.add.text(4,64,str_sub+"\n ", {font: '18pt "Press Start 2P"', align: 'center'});
	} else {
		this.sub = this.game.add.text(4,64,str_sub+"\n ", {font: '48pt "Press Start 2P"', align: 'center'});
	}
	
	this.sub.x = (this.game.width - this.sub.width) / 2;
	
	if (language === 'en') this.sub.x = 4; //i dunno this is kinda nuts but it works so whatevs
	
	this.press = this.game.add.text(0,this.game.height - 32,str_prs, {font: '12pt "Press Start 2P"', align: 'center'});
	this.press.x = (this.game.width - this.press.width) / 2;
	
	this.game.add.tween(this.title).to({y:this.title.y + 16}, 2000, Phaser.Easing.Quadratic.InOut, true, 0, Number.MAX_VALUE, true);
	this.game.add.tween(this.sub).to({y:this.sub.y + 16}, 2000, Phaser.Easing.Quadratic.InOut, true, 0, Number.MAX_VALUE, true);
	
	this.start = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.starting = false;
	this.timer = 0;
	this.jumping = false;
	this.phase = false;
	
	// camera fade effect
	this.fade = this.game.add.bitmapData(this.game.width, this.game.height);
	this.fade.context.fillStyle = '#000000';
	this.fade.context.fillRect(0, 0, this.game.width, this.game.height);
	this.fadesprite = this.game.add.sprite(0, 0, this.fade);
	this.fadesprite.alpha = 0.99;
	this.game.add.tween(this.fadesprite).to({alpha:0}, 250, null, true);
	this.fading = false;
	
	// JAMS
	this.music = this.game.add.sound('double', 0, true);
	this.music.play();
	this.soundjump = this.game.add.sound('jump', 0.3, false);
  },
  render: function() {
	//this.game.debug.text('X POS: ' + this.bun.x, 8, 16);
	//this.game.debug.text('TIMER: ' + this.timer, 8, 32);
	//this.game.debug.text('Y POS: ' + this.bun.y, 8, 32);
  },
  update: function() {
	// update clouds
    this.clouds.x -= 0.5;
	
	if (this.clouds.x < -this.clouds.width)
	{
		this.clouds.x = this.game.width;
	}
	
	// bunny animations
	
	if (this.starting)
	{
		this.timer++;
	}
	
	if (this.timer === 5) {
		this.bun.y += 4;
	}
	
	if (this.timer > 25 && !this.jumping)
	{
		this.bun.animations.play('walk');
		this.game.add.tween(this.bun).to({x:146}, 1000, Phaser.Easing.Quadratic.InOut, true);
		this.jumping = true;
	}
	
	if (this.timer > 40 && !this.phase)
	{
		this.game.add.tween(this.bun).to({y:320}, 350, Phaser.Easing.Quadratic.InOut, true, 0, 1, true);
		this.soundjump.play();
		this.bun.animations.stop();
		this.phase = true;
	}
	
	if (this.bun.x == 146 && this.bun.y == 410)
	{
		this.bun.destroy();
		this.drill.destroy();
		this.bunny.revive();
	}
	
	if (this.bunny.y > this.game.height && !this.fading)
	{
		this.fading = true;
		this.game.add.tween(this.fadesprite).to({alpha:1}, 250, null, true);
	}
	
	if (this.fading && this.music.volume > 0)
	{
		//this.music.play('', 0, this.music.volume - 1/250, true, false);
		this.music.volume -= 0.05;
	} else if (this.fading && this.music.volume !== 0) {
		this.music.volume = 0;
	} else if (this.music.volume < 0.75) {
		this.music.volume += 0.005;
	}
	
	if (this.fadesprite.alpha === 1)
	{
		this.music.stop();
		this.game.state.start('play');
	}
	
	if (this.start.isDown && !this.starting)
	{
		this.bun.animations.play('wake');
		this.bun.y -= 4;
		this.starting = true;
	}
  }
};

module.exports = Menu;
