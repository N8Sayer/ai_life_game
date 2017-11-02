import Phaser from 'phaser'

export default class Item extends Phaser.Sprite {
  constructor(game, x, y, asset) {
    super(game, x, y, asset);
    this.canWalkOver = true;
    this.canPickUp = true;
  }

  addToWorld(props) {

  }
}
