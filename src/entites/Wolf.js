import AttackEntity from './AttackEntity';

export default class Wolf extends AttackEntity {
  constructor(game, x, y, asset) {
    super(game, x, y, asset);
    this.health = 50;
    this.animations.add('idle', [0, 1], 3, true);
    this.animations.add('move', null, 10, true);
  }

  addToWorld(props) {
    props.group.add(props.object);
    this.body.setRectangle(10, 20);
    this.body.setCollisionGroup(props.collisionGroup);
    this.body.collides(props.collisions);
    this.body.mass = 100;
    this.body.damping = 0.3;
    this.animations.play('idle');
  }
}
