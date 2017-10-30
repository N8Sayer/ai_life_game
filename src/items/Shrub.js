import Item from './Item';

export default class Shrub extends Item {
  constructor(game, x, y) {
    super(game);
    this.sprite = game.add.sprite(x, y, 'shrub');
  }
}
