class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('smallship', './assets/smallship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('starfieldfar', './assets/starfieldsmall.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});

    }

    create() {
        //volume level (0-1)
        this.volumeLevel = 0.1;

        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.starfieldfar = this.add.tileSprite(0, 0, 640, 480, 'starfieldfar').setOrigin(0, 0);

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        // add ships (x3)
        this.ship01 = new Smallship(this, game.config.width + borderUISize*6, borderUISize*4, 'smallship', 0, 30*game.settings.pointBonus).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20*game.settings.pointBonus).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10*game.settings.pointBonus).setOrigin(0, 0);
        
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // define mouse
        if(game.settings.mouseOn)
        {
            this.input.mouse.disableContextMenu();
            this.pointer = this.input.activePointer;
            this.input.mouse.requestPointerLock();
        }

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0xA52A2A).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x45190b).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x45190b).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x45190b).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x45190b).setOrigin(0, 0);

        // initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding + 130, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        // GAME OVER flag
        this.gameOver = false;

        // Play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            if (game.settings.mouseOn)
                {
                    this.input.mouse.releasePointerLock();
                }
            this.bgm.stop();
            this.gameOver = true;
        }, null, this);

        // countdown text
        let countdownConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 120
        }
        this.countdown = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, game.settings.gameTimer, countdownConfig);

        // speed countdown
        this.speedCount = this.time.delayedCall(30000, () => {
            this.ship01.increaseSpeed();
            this.ship02.increaseSpeed();
            this.ship03.increaseSpeed();
        }, null, this);

        // explosion sound
        this.explosion = this.sound.add('sfx_explosion', {volume: this.volumeLevel});

        // bgm
        this.bgm = this.sound.add('bgm', {volume: this.volumeLevel, loop: true});
        this.bgm.play();

        // js black magic for pointer movement
        this.input.on('pointermove', function (pointer) {
            this.p1Rocket.changeDestination(pointer.movementX);
        }, this);

        // on click
        this.input.on('pointerdown', function () {
            if (game.settings.mouseOn) {
                if (this.input.mouse.locked && !this.gameOver) {
                    this.p1Rocket.fire();
                } else {
                    this.input.mouse.requestPointerLock();
                    this.p1Rocket.startMovement();
                }
            }
        }, this);
    }

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 9;
        this.starfieldfar.tilePositionX -= 6;
        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
        } 

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
            this.changeTime(1000);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            this.changeTime(2000);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            this.changeTime(3000);
        }

        // show time left
        this.countdown.text = ('Time:' + Phaser.Math.CeilTo((this.clock.delay - this.clock.getElapsed()) / 1000));

        if (game.settings.mouseOn && !this.input.mouse.locked) {
            this.p1Rocket.stopMovement();
        }
        
        if (game.settings.mouseOn && this.input.mouse.locked) {
            this.p1Rocket.startMovement();
        }

    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });       
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.explosion.play();
    }

    changeTime(amount) {
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }
        
        //reset time and add new time
        this.currentTime = this.clock.delay - this.clock.getElapsed();
        this.clock.remove();
        this.clock = this.time.delayedCall(this.currentTime + amount, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            if (game.settings.mouseOn)
            {
                this.input.mouse.releasePointerLock();
            }
            this.bgm.stop();
            this.gameOver = true;
        }, null, this);
    }
}