/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../entites/Player';
import Shrub from '../items/Shrub';
import Torch from '../items/Torch';
import Tree from '../items/Tree';
import Llama from '../entites/Llama';

var player;
var controls;
var healthBar;
var manaBar;
var backgroundSprite;

var items;
var trees;
var entites;

var playerCollisionGroup;
var itemCollisionGroup;
var treeCollisionGroup;
var entitesCollisionGroup;

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
    backgroundSprite = this.game.add.sprite(0, 0, 'background');
    this.world.setBounds(0, 0, 2000, 1000);
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.game.physics.p2.setImpactEvents(true);

    this.createControls();

    playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
    itemCollisionGroup = this.game.physics.p2.createCollisionGroup();
    treeCollisionGroup = this.game.physics.p2.createCollisionGroup();
    entitesCollisionGroup = this.game.physics.p2.createCollisionGroup();

    this.game.physics.p2.updateBoundsCollisionGroup();

    items = this.game.add.group();
    items.enableBody = true;
    items.physicsBodyType = Phaser.Physics.P2JS;

    trees = this.game.add.group();
    trees.enableBody = true;
    trees.physicsBodyType = Phaser.Physics.P2JS;

    entites = this.game.add.group();
    entites.enableBody = true;
    entites.physicsBodyType = Phaser.Physics.P2JS;

    var treeTop = trees.create(800, 300, 'tree_top');
    var treeBottom = trees.create(800, 370, 'tree_bottom');
    treeBottom.body.setRectangle(70, 20);
    treeBottom.body.setCollisionGroup(treeCollisionGroup);
    treeBottom.body.collides([itemCollisionGroup, playerCollisionGroup, treeCollisionGroup, entitesCollisionGroup]);
    treeBottom.body.dynamic = false;


    for(let i = 0; i < 10; i++) {
      var torch = items.create(300, 200 + (i*35), 'torch');
      torch.body.dynamic = false;
      torch.body.setRectangle(10, 20);
      torch.body.setCollisionGroup(itemCollisionGroup);
      torch.body.collides([itemCollisionGroup, playerCollisionGroup, treeCollisionGroup, entitesCollisionGroup]);
      torch.animations.add('animate');
      torch.animations.play('animate', 10, true);
    }

    this.createGUI();
    this.createPlayer();

    var llama = new Llama(this.game, 400, 400, 'llama');
    entites.add(llama);
    //this.game.add.existing(llama);
    llama.destination.x = 450;
    llama.destination.y = 450;
    llama.body.setRectangle(10, 20);
    llama.body.setCollisionGroup(entitesCollisionGroup);
    llama.body.collides([itemCollisionGroup, playerCollisionGroup, treeCollisionGroup, entitesCollisionGroup]);
    llama.body.mass = 100;
    llama.body.damping = 0.3;
    llama.animations.play('llama', 10, true);

    var emitter = this.game.add.emitter(1000, 500, 5);
    emitter.makeParticles('spark');
    emitter.setAlpha(0.3, 0.8);
    emitter.setScale(0.5, 1);
    emitter.flow(1000, 0, 5, 1, true);
    emitter.gravity = 0;
    emitter.start(false, 500, 1);
  }

  createControls() {
    controls = {
      up: null,
      down: null,
      left: null,
      right: null,
      use: null,
      pickUp: null,
      drop: null,
    }

    controls.up = game.input.keyboard.addKey(Phaser.KeyCode.W);
    controls.down = game.input.keyboard.addKey(Phaser.KeyCode.S);
    controls.left = game.input.keyboard.addKey(Phaser.KeyCode.A);
    controls.right = game.input.keyboard.addKey(Phaser.KeyCode.D);
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
    player = new Player(this.game, this.world.centerX, this.world.centerY, 'warrior');
    this.game.add.existing(player);
    this.game.physics.p2.enable(player, false);
    player.body.fixedRotation = true;
    this.game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    this.game.time.events.loop(Phaser.Timer.SECOND, function(){player.health -= 1}, this);

    player.body.setCollisionGroup(playerCollisionGroup);

    this.createPlayerCollisionCallBacks();

    controls.left.onDown.add(() => {
      player.animations.play('warrior_running_left');
      player.prevAnimation = 'warrior_idle_left';
    }, this);

    controls.right.onDown.add(() => {
      player.animations.play('warrior_running_right');
      player.prevAnimation = 'warrior_idle_right';
    }, this);
  }

  createPlayerCollisionCallBacks() {
    player.body.collides(itemCollisionGroup, (b1, b2) => {
      console.log("Collided with torch!");
    }, this);
    player.body.collides(treeCollisionGroup, (b1, b2) => {
      console.log("Collided with tree!");
    }, this);
    player.body.collides(entitesCollisionGroup, (b1, b2) => {
      console.log("Collided with entity!");
    }, this);
  }

  checkOverlapManually(enemy) {
    for (var i =0 ; i<enemies.length; i++){
      var dx = ship.body.x-enemy.body.x;  //distance ship X to enemy X
      var dy = ship.body.y -enemy.body.y;  //distance ship Y to enemy Y
      var dist = Math.sqrt(dx*dx + dy*dy);     //pythagoras ^^  (get the distance to each other)
      if (dist < shipdiameter+bulletdiameter){  // if distance to each other is smaller than both radii together a collision/overlap is happening
        dosomething(enemy);
      }
    }
  }

  checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
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
    player.body.setZeroVelocity();
    controls.up.isDown ? player.body.moveUp(200) : null
    controls.down.isDown ? player.body.moveDown(200) : null
    controls.left.isDown ? player.body.moveLeft(200) : null
    controls.right.isDown ? player.body.moveRight(200) : null

    if(!controls.left.isDown && !controls.right.isDown && !controls.up.isDown && !controls.down.isDown) {
      player.animations.play(player.prevAnimation);
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
