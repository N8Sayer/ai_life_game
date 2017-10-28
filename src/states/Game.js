/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../entites/Player';
import Shrub from '../items/Shrub';

var player = new Player();
var cursors;
var healthGUIText;
var backgroundSprite;

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    //Creating world
    backgroundSprite = this.game.add.sprite(0, 0, 'background');
    this.world.setBounds(0, 0, 2000, 1000);
    this.game.physics.startSystem(Phaser.Physics.P2JS);

    var shrub = new Shrub();
    shrub.sprite = this.game.add.sprite(100, 100, 'shrub');

    //Creating player
    player.sprite = this.game.add.sprite(this.world.centerX, this.world.centerY, 'character');
    this.game.physics.p2.enable(player.sprite);
    player.sprite.body.fixedRotation = true;
    cursors = this.game.input.keyboard.createCursorKeys();
    this.game.camera.follow(player.sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    this.game.time.events.loop(Phaser.Timer.SECOND, function(){player.health -= 1}, this);

    //Creating GUI
    healthGUIText = game.add.text(
      this.game.camera.view.x - (this.game.camera.view.x - 10),
      this.game.camera.view.y - (this.game.camera.view.y - 10),
      "Health: " + player.health, {font: '10pt'});

    /*var emitter = this.game.add.emitter(this.world.centerX, 500, 200);
    emitter.makeParticles('spark');
    emitter.setAlpha(0.3, 0.8);
    emitter.setScale(0.5, 1);
    emitter.gravity = -200;
    emitter.start(false, 500, 1);*/
  }

  update() {
    this.updateGUI();
    this.updatePlayer();
  }

  updateGUI() {
    healthGUIText.x = this.game.camera.view.x + 10;
    healthGUIText.y = this.game.camera.view.y + 10;
    healthGUIText.setText("Health: " + player.health);
  }

  updatePlayer() {
    player.sprite.body.setZeroVelocity();
    cursors.up.isDown ? player.sprite.body.moveUp(200) : null
    cursors.down.isDown ? player.sprite.body.moveDown(200) : null
    cursors.left.isDown ? player.sprite.body.velocity.x = -200 : null
    cursors.right.isDown ? player.sprite.body.moveRight(200) : null
  }

  render () {}
}
