import Phaser from 'phaser'

export default class Player extends Phaser.Sprite {
  constructor(game, x, y, asset) {
    super(game, x, y, asset);
    this.health = 100;
    this.inHand = null;
    this.projectiles = [];
    this.animations.add('warrior_idle_left', [0, 1], 3, true);
    this.animations.add('warrior_running_left', [2, 3, 4, 5, 6, 7], 14, true);
    this.animations.add('warrior_running_right', [8, 9, 10, 11, 12, 13], 14, true);
    this.scale.setTo(1.2, 1.2);
  }
}
