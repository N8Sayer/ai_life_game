import WanderEntity from './WanderEntity';

export default class Llama extends WanderEntity {
  constructor(game, x, y, asset) {
    super(game, x, y, asset);
    this.health = 50;
    this.animations.add('idle', [0, 1], 3, true);
    this.animations.add('move', null, 10, true);
  }
}
