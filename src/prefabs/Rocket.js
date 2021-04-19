// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
    // add object to existing scene
    scene.add.existing(this);
    this.isFiring = false;
    this.moveSpeed = 5;

    this.sfxRocket = scene.sound.add('sfx_rocket', {volume: scene.volumeLevel});

    this.destinationX = x;
    this.moveOk = true;
    }

    update() {
        //console.log(this.moveOk);
        if (this.mouse == false) {
            // left/right movement
            if(!this.isFiring) {
                if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                    this.x -= this.moveSpeed;
                } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                        this.x += this.moveSpeed;
                }
            }

            // fire button
            if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
                this.fire();
            }
        }
        else
        {
            if (this.x != this.destinationX && this.moveOk && !this.isFiring) {
                if (this.destinationX < (borderUISize + this.width)) {
                    this.destinationX = borderUISize + this.width;
                }
                if (this.destinationX > (game.config.width - borderUISize - this.width)) {
                    this.destinationX = game.config.width - borderUISize - this.width;
                } 
                this.x = this.destinationX;
                
                //console.log(this.destinationX);
            }
        }

        // if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }
        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
            this.scene.changeTime(-5000);
        }
    }

    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }

    fire() {
        if (!this.isFiring)
        {
            this.isFiring = true;
            this.sfxRocket.play();  // play sfx
        }
    }

    changeDestination(amount) {
        if (this.moveOk) {
            this.destinationX += amount;
        }
    }

    startMovement() {
        this.moveOk = true;
    }

    stopMovement() {
        console.log("stop");
        if (this.moveOk) {
            this.moveOk = false;
        }
    }
}