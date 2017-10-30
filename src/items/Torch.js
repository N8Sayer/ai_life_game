import Item from './Item';

export default class Torch extends Item {
  constructor(game, x, y) {
    super(game);
    this.sprite = game.add.sprite(x, y, 'torch');
    this.sprite.animations.add('animate');
    this.sprite.animations.play('animate', 10, true);
  }
}
