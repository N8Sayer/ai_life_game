import Phaser from 'phaser'

export default class Player extends Phaser.Sprite {
  constructor(game, x, y, asset) {
    super(game, x, y, asset);
    this.health = 100;
    this.maxHealth = 100;
    this.mana = 100;
    this.maxMana = 100;
    this.inHand = null;
    this.projectiles = [];
    this.animations.add('warrior_idle_left', [0, 7], 3, true);
    this.animations.add('warrior_idle_right', [8, 9], 3, true);
    this.animations.add('warrior_running_right', [1, 2, 3, 4, 5, 6], 14, true);
    this.animations.add('warrior_running_left', [10, 11, 12, 13, 14, 15], 14, true);
    this.prevAnimation = 'warrior_idle_left';
    this.scale.setTo(1.2, 1.2);
  }
}
