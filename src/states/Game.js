/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../entites/Player';
import Shrub from '../items/Shrub';
import Torch from '../items/Torch';
import Tree from '../items/Tree';

var player = new Player();
var cursors;
var healthBar;
var manaBar;
var backgroundSprite;
var items;
var trees;

var playerCollisionGroup;
var itemCollisionGroup;
var treeCollisionGroup;

export default class extends Phaser.State {
  init () {}
  preload () {}

  /*
  #####################################################################################################################
  ################################################ CREATION METHODS BELOW #############################################
  #####################################################################################################################
  #####################################################################################################################
  */
  create () {
    //Creating world
    backgroundSprite = this.game.add.sprite(0, 0, 'background');
    this.world.setBounds(0, 0, 2000, 1000);
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.game.physics.p2.setImpactEvents(true);

    playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
    itemCollisionGroup = this.game.physics.p2.createCollisionGroup();
    treeCollisionGroup = this.game.physics.p2.createCollisionGroup();

    //  This part is vital if you want the objects with their own collision groups to still collide with the world bounds
    //  (which we do) - what this does is adjust the bounds to use its own collision group.
    this.game.physics.p2.updateBoundsCollisionGroup();

    items = this.game.add.group();
    items.enableBody = true;
    items.physicsBodyType = Phaser.Physics.P2JS;

    trees = this.game.add.group();
    trees.enableBody = true;
    trees.physicsBodyType = Phaser.Physics.P2JS;

    var treeTop = trees.create(800, 300, 'tree_top');
    var treeBottom = trees.create(800, 370, 'tree_bottom');
    //treeBottom.anchor.setTo(1, 1)
    treeBottom.body.setRectangle(70, 20);
    treeBottom.body.setCollisionGroup(treeCollisionGroup);
    treeBottom.body.collides([itemCollisionGroup, playerCollisionGroup, treeCollisionGroup]);
    treeBottom.body.dynamic = false;


    for(let i = 0; i < 10; i++) {
      var torch = items.create(300, 200 + (i*35), 'torch');
      torch.body.dynamic = false;
      torch.body.setRectangle(10, 20);
      torch.body.setCollisionGroup(itemCollisionGroup);
      torch.body.collides([itemCollisionGroup, playerCollisionGroup]);
      torch.animations.add('animate');
      torch.animations.play('animate', 10, true);
      //var torch = new Torch(this, 300, 200 + (i*40));
    }


    this.createGUI();
    this.createPlayer();

    /*var emitter = this.game.add.emitter(this.world.centerX, 500, 200);
    emitter.makeParticles('spark');
    emitter.setAlpha(0.3, 0.8);
    emitter.setScale(0.5, 1);
    emitter.gravity = -200;
    emitter.start(false, 500, 1);*/
  }

  createGUI() {
    healthBar = this.game.add.sprite(
      this.game.camera.view.x - (this.game.camera.view.x - 10),
      this.game.camera.view.y - (this.game.camera.view.y - 10),
      'hpmana_bar');
    healthBar.scale.setTo(1.5, 1.5);

    manaBar = this.game.add.sprite(
      this.game.camera.view.x - (this.game.camera.view.x - 10),
      this.game.camera.view.y - (this.game.camera.view.y - 30),
      'hpmana_bar');
    manaBar.scale.setTo(1.5, 1.5);
  }

  createPlayer() {
    player.sprite = this.game.add.sprite(this.world.centerX, this.world.centerY, 'player');
    player.sprite.animations.add('player_left');
    player.sprite.animations.add('player_right');
    player.sprite.scale.setTo(1.2, 1.2);
    this.game.physics.p2.enable(player.sprite, false);
    player.sprite.body.fixedRotation = true;
    player.sprite.body.setCollisionGroup(playerCollisionGroup);
      player.sprite.animations.play('player_left', 5, true);

    player.sprite.body.collides(itemCollisionGroup, function(b1, b2) {

    }, this);
    player.sprite.body.collides(treeCollisionGroup, function(b1, b2) {

    }, this);

    cursors = this.game.input.keyboard.createCursorKeys();
    cursors.left.onDown.add(function() {
      player.sprite.animations.play('player_left');
    }, this);

    cursors.right.onDown.add(function() {
      player.sprite.animations.play('player_right');
    }, this);

    this.game.camera.follow(player.sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    this.game.time.events.loop(Phaser.Timer.SECOND, function(){player.health -= 1}, this);
  }
  /*
  #####################################################################################################################
  #####################################################################################################################
  #####################################################################################################################
  #####################################################################################################################
  */


  /*
  #####################################################################################################################
  ################################################# UPDATE METHODS BELOW ##############################################
  #####################################################################################################################
  #####################################################################################################################
  */
  update() {
    //sprite.bringToTop(); //brings sprite on top
    //this.game.world.bringToTop(spriteGroup); //brings sprite group on top

    this.game.world.bringToTop(trees);

    this.updateGUI();
    this.updatePlayer();
  }

  updateGUI() {
    healthBar.x = this.game.camera.view.x + 10;
    healthBar.y = this.game.camera.view.y + 10;

    manaBar.x = this.game.camera.view.x + 10;
    manaBar.y = this.game.camera.view.y + 30;
  }

  updatePlayer() {
    player.sprite.body.setZeroVelocity();
    cursors.up.isDown ? player.sprite.body.moveUp(200) : null
    cursors.down.isDown ? player.sprite.body.moveDown(200) : null
    cursors.left.isDown ? player.sprite.body.moveLeft(200) : null
    cursors.right.isDown ? player.sprite.body.moveRight(200) : null

    if(cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.down.isDown) {
      player.sprite.animations.stop();
    }

  }
  /*
  #####################################################################################################################
  #####################################################################################################################
  #####################################################################################################################
  #####################################################################################################################
  */

  render () {}
}
