var menuState = {
    init: function() {
        var text = "Phaser Version 2.0.3 works!\nDream Show Adventures w00t!";
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
        // State Update Logic goes here.
    }
};

var game = new Phaser.Game(640, 480, Phaser.AUTO, 'game', menuState);