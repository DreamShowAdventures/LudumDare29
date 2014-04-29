'use strict';

function Boot() {}

Boot.prototype = {
	preload: function() {
		this.load.image('preloader', 'assets/preloader.png');
	},
	create: function() {
		this.game.input.maxPointers = 1;
		this.game.state.start('preload');
	}
};

module.exports = Boot;