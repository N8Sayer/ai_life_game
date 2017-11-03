import Weapon from './Weapon';

export default class Sword extends Weapon {
  constructor(game, x, y, asset) {
    super(game, x, y, asset);
    this.damage = 5;
  }

  addToWorld(props) {
    
  }

}
