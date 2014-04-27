'use strict';

var Coin = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'coin', frame);
  
  // scale up!
	this.smoothed = false;
	this.scale.x = 2;
	this.scale.y = 2;
	this.value = 1;
};

Coin.prototype = Object.create(Phaser.Sprite.prototype);
Coin.prototype.constructor = Coin;

Coin.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Coin;
