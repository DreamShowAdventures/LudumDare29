/*global Phaser*/
/*global menuState*/

/**
 * @author Steve Richey http://www.steverichey.com @stvr_tweets
 */

var gameWidth = 192;
var gameHeight = 384;
var zoom = 2;

var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'game', playState, false, false);
game.state.add('play', playState);
game.state.start('play');