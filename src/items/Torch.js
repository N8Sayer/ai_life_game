import Item from './Item';

export default class Torch extends Item {
  constructor(game, x, y, asset) {
    super(game, x, y, asset);
    this.animations.add('animate');
    this.animations.play('animate', 10, true);
  }

  addToWorld(props) {
    props.group.add(props.object);
    this.body.dynamic = false
    this.body.setRectangle(10, 20);
    this.body.setCollisionGroup(props.collisionGroup);
    this.body.collides(props.collisions);
    this.animations.play('animate');
  }
}
