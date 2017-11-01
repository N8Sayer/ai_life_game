import Phaser from 'phaser'

export default class Llama extends Phaser.Sprite {
  constructor(game, x, y, asset) {
    super(game, x, y, asset);
    this.health = 50;
    this.animations.add('llama');
    this.destination = {x: null, y: null}
    this.tempPosition = {x: null, y: null}
  }

  update() {
    let dx = this.destination.x; let dy = this.destination.y;
    let x = this.position.x; let y = this.position.y;

    if(Phaser.Math.distance(x, y, dx, dy) <= 10 &&
       dx == null && dy == null) {

      this.destination.x = null;
      this.destination.y = null;
      this.tempPosition.x = x;
      this.tempPosition.y = y;

      setTimeout(() => {
        let rand = parseInt((Math.random() * (0 - 1) + 1).toFixed(0));
        let randX = parseInt((Math.random() * (20 - 100) + 100).toFixed(0));
        let randY = parseInt((Math.random() * (20 - 100) + 100).toFixed(0));

        if(rand === 0) {
          this.destination.y = y + randY;
          this.destination.x = x + randX;
        } else {
          this.destination.y = y - randY;
          this.destination.x = x - randX;
        }
      }, 5000);

    } else {

      dx = this.tempPosition.x; dy = this.tempPosition.y;

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
}
