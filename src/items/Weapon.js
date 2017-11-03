import Item from './Item';

export default class Weapon extends Item {
  constructor(game, x, y, asset) {
    super(game, x, y, asset);
    this.damage = 5;
  }

}
