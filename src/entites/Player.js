import Phaser from 'phaser'

export default class Player extends Phaser.Sprite {
  constructor(game, x, y, asset) {
    super(game, x, y, asset);
    this.health = 100;
    this.inHand = null;
    this.projectiles = [];
    this.animations.add('player_left');
    this.animations.add('player_right');
    this.scale.setTo(1.2, 1.2);
  }
}
