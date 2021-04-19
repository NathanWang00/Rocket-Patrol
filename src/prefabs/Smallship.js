// Smallship prefab
class Smallship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
      super(scene, x, y, texture, frame);
  
    // add object to existing scene
    scene.add.existing(this);
    this.points = pointValue;
    this.moveSpeed = game.settings.smallshipSpeed;
    
    //random ship direction
    this.flip = Phaser.Math.Between(0, 1);
    if (this.flip == 0)
    {
        this.flipX = true;
        this.x = 0 - Phaser.Math.Between(0, 50);
    }
    else
    {
        this.x += Phaser.Math.Between(0, 50)
    }
    }

    update() {
        //move ship left or right
        if (this.flip == 0)
        {
            this.x += this.moveSpeed * 1.1;
        }
        else
        {
            this.x -= this.moveSpeed;
        }
        
        //wrap around from left to right
        if(this.x <= 0 - this.width && this.flip == 1) {
            this.reset();
        } else if (this.x >= game.config.width + this.width && this.flip == 0) {
            this.reset();
        }
    }

    reset() {
        this.flip = Phaser.Math.Between(0, 1);
        if (this.flip == 1) {
            this.flipX = false;
            this.x = game.config.width + Phaser.Math.Between(0, 50);
        } else {
            this.flipX = true;
            this.x = 0 - Phaser.Math.Between(0, 50);
        }
    }

    increaseSpeed(){
        this.moveSpeed *= 1.25;
    }
}