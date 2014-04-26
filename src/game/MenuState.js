/*global Phaser*/
/*global game*/

/**
 * @author Steve Richey http://www.steverichey.com @stvr_tweets
 */

var menuState = {
    init: function() {
        var text = "We Are Drilling to the Core!";
        var style = { font: "24px Arial", fill: "#fff", align: "center" };
        var t = game.add.text(this.world.centerX, this.world.centerY, text, style);
        t.anchor.setTo(0.5, 0.5);
    },
    preload: function() {
        // State preload logic goes here
    },
    create: function(){
      // State create logic goes here
    },
    update: function() {
        
    }
};