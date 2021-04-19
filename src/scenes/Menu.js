class Menu extends Phaser.Scene {
  constructor() {
      super("menuScene");
  }

  preload() {
      // load audio
      this.load.audio('sfx_select', './assets/blip_select12.wav');
      this.load.audio('sfx_explosion', './assets/explosion38.wav');
      this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
  }

  create() {
      // menu text config
      let menuConfig = {
          fontFamily: 'Courier',
          fontSize: '26px',
          backgroundColor: '#A52A2A',
          color: '#FFFFFF',
          align: 'right',
          padding: {
              top: 5,
              bottom: 5,
          },
          fixedWidth: 0
      }

      // show menu text
      this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL EXTREME!!!', menuConfig).setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2, 'Arrows/mouse to move, (F)/click to fire', menuConfig).setOrigin(0.5);
      menuConfig.backgroundColor = '#FF8C00';
      menuConfig.color = '#000';
      menuConfig.fontSize = '24px';
      this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, '<-/l.click for Novice, ->/r.click for Expert', menuConfig).setOrigin(0.5);
  
      // define keys
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

      this.input.mouse.disableContextMenu();

      //volume level (0-1)
      this.volumeLevel = 0.1;
      this.selectSound = this.sound.add('sfx_select', {volume: this.volumeLevel});
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        // easy mode
        game.settings = {
          spaceshipSpeed: 3,
          gameTimer: 60000,
          pointBonus: 1,
          mouseOn: false
        }   
        this.selectSound.play();
        this.scene.start('playScene');  
    }
    if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
      // hard mode
      game.settings = {
        spaceshipSpeed: 4.5,
        gameTimer: 45000,
        pointBonus: 1.5,
        mouseOn: false
      }
      this.selectSound.play();
      this.scene.start('playScene');  
    }
    var pointer = this.input.activePointer;

    if (pointer.leftButtonDown()) {
      // easy mode
      game.settings = {
        spaceshipSpeed: 3,
        gameTimer: 60000,
        pointBonus: 1,
        mouseOn: true
      }   
      this.selectSound.play();
      this.scene.start('playScene');  
    }
    
    if (pointer.rightButtonDown()) {
      // hard mode
      game.settings = {
        spaceshipSpeed: 4.5,
        gameTimer: 45000,
        pointBonus: 1.5,
        mouseOn: true
      }
      this.selectSound.play();
      this.scene.start('playScene');  
    }
  }
}