/*global Phaser*/
/*global menuState*/

/**
 * @author Steve Richey http://www.steverichey.com @stvr_tweets
 */

var gameWidth = 300;
var gameHeight = 600;
var zoom = 2;

var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'game', playState, false, false);