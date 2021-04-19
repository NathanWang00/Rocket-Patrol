//Nathan Wang, Rocket Patrol Extreme, 4/19/21, ~10 hours for the mod, ~10 hours for the base game.
//BGM (False Awakenings) by https://soundcloud.com/anttu-janhunen/
//Points: random ship movement (5), speed up after 30 sec (5), bgm (5) parallax scrolling (10), remaining time (10), add time for successful hit (20), mouse controls (20)
//spaceship variant (20)
//Total: 95
//Not sure if the background changes counted for any points 

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