export default class Item {
  constructor(game) {
    this.game = game;
    this.sprite = {}
    this.canWalkOver = true;
    this.canPickUp = true;
  }
}
