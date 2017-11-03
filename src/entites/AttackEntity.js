import Phaser from 'phaser'

export default class AttackEntity extends Phaser.Sprite {
  constructor(game, x, y, asset) {
    super(game, x, y, asset);
    this.destination = {x: null, y: null}
    this.pursueTargetLoop = null;
    this.target = null;
    this.setTargetDestination();
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
    this.body.setZeroRotation();
    //this.body.setZeroVelocity();
    this.body.rotation = 0;

    if(this.target != null) {
      if(this.pursueTargetLoop != null) {
        this.animations.play('idle');
        this.target = null;
        this.body.setZeroVelocity();
        this.pursueTargetLoop = setTimeout(() => {
           pursueTargetLoop = null;
           if(this.setTargetDestination()){
             this.animations.play('move');
           }
        }, 20000);
      }
    } else {
      return;
    }

    if(Phaser.Math.distance(x, y, dx, dy) <= 5) {

      //this.animations.play('attack');

      //TODO Attack?

    } else if(dx != null && dy != null && this.target != null) {

      if(Phaser.Math.distance(x+1, y, dx, dy) < Phaser.Math.distance(x, y, dx, dy)) {
          this.body.moveRight(70);
      } else if(Phaser.Math.distance(x-1, y, dx, dy) < Phaser.Math.distance(x, y, dx, dy)){
          this.body.moveLeft(70);
      } else if(Phaser.Math.distance(x, y-1, dx, dy) < Phaser.Math.distance(x, y, dx, dy)) {
          this.body.moveUp(70);
      } else if(Phaser.Math.distance(x, y+1, dx, dy) < Phaser.Math.distance(x, y, dx, dy)) {
        this.body.moveDown(70);
      }

    }
  }

  setTargetDestination() {
    var angle = Math.random()*Math.PI*2;
    let randX = Math.cos(angle)*500;
    let randY = Math.sin(angle)*500;
    this.destination.y = this.position.y + randY;
    this.destination.x = this.position.x + randX;
    this.target = 1;
    return true;
  }

}
