import Phaser from 'phaser'

export default class WanderEntity extends Phaser.Sprite {
  constructor(game, x, y, asset) {
    super(game, x, y, asset);
    this.destination = {x: null, y: null}
    this.findDestination = false;
    this.findDestinationLoop = null;
  }

  /**
    Pick random destination.
    Travel to it, and if the llama is close, or the maximum amout
    of time that it can seek has been exceeded: stop for 5 seconds.
    Then loop through it again.
  */
  update() {
    let dx = this.destination.x; let dy = this.destination.y;
    let x = this.position.x; let y = this.position.y;
    this.body.rotation = 0;

    if(Phaser.Math.distance(x, y, dx, dy) <= 10 || !this.findDestination) {

      this.destination.x = null;
      this.destination.y = null;
      this.findDestination = true;
      this.body.setZeroVelocity();
      this.animations.play('idle');

      setTimeout(() => {
        this.getRandomDestination();
        this.animations.play('move');
      }, 5000);

      if(this.findDestinationLoop) clearTimeout(this.findDestinationLoop);
      this.findDestinationLoop = setTimeout(() => {
        this.findDestination = false;
      }, 10000);

    } else if(dx != null && dy != null) {

      if(Phaser.Math.distance(x+1, y, dx, dy) < Phaser.Math.distance(x, y, dx, dy)) {
          this.body.moveRight(50);
      } else if(Phaser.Math.distance(x-1, y, dx, dy) < Phaser.Math.distance(x, y, dx, dy)){
          this.body.moveLeft(50);
      } else if(Phaser.Math.distance(x, y-1, dx, dy) < Phaser.Math.distance(x, y, dx, dy)) {
          this.body.moveUp(50);
      } else if(Phaser.Math.distance(x, y+1, dx, dy) < Phaser.Math.distance(x, y, dx, dy)) {
        this.body.moveDown(50);
      }

    }
  }

  getRandomDestination() {
    var angle = Math.random()*Math.PI*2;
    let randX = Math.cos(angle)*100;
    let randY = Math.sin(angle)*100;
    this.destination.y = this.position.y + randY;
    this.destination.x = this.position.x + randX;
  }

}
