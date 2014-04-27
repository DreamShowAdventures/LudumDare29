/*global Phaser*/
/*global game*/

/**
 * @author Steve Richey http://www.steverichey.com @stvr_tweets
 */

var Chunk = function (game, parent) {
	Phaser.Group.call(this, game, parent);
	
	// create the tilemap
	this.tilemap = new Phaser.Tilemap(game, null, 32, 32, 6, 12);
	
	// load the tilemap image
	this.tilemap.addTilesetImage('', 'tileset_dirt', 32, 32, 0, 0, 0);
	
	// fill the tilemap with the basic dirt block
	this.tilemap.fill(0, 0, 0, 6, 12);
	
	// randomise the tiles
	//this.tilemap.random(0, 0, 6, 12);
	
	this.add(this.tilemap);
};

Chunk.prototype = Object.create(Phaser.Group.prototype);
Chunk.prototype.constructor = Chunk;

Chunk.prototype.update = function() {
	
};