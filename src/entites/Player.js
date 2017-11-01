import Phaser from 'phaser'

export default class Player extends Phaser.Sprite {
  constructor(game, x, y, asset) {
    super(game, x, y, asset);
    this.health = 100;
    this.inHand = null;
    this.projectiles = [];
    this.animations.add('warrior_idle_left');
    this.animations.add('warrior_running_left');
    this.animations.add('warrior_running_right');
    this.scale.setTo(1.2, 1.2);
  }
}
