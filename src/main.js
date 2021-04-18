//Nathan Wang, Rocket Patrol Extreme, 4/19/21, ~10 hours for the mod, ~10 hours for the base game.
//Points: random ship movement (5), speed up after 30 sec (5), parallax scrolling (10), remaining time (10), add time for successful hit (20)

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;