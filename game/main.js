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