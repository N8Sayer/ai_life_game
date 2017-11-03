/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../entites/Player';
import Shrub from '../items/Shrub';
import Torch from '../items/Torch';
import TreeTop from '../items/TreeTop';
import TreeBottom from '../items/TreeBottom';
import Llama from '../entites/Llama';
import Wolf from '../entites/Wolf';
import Sheep from '../entites/Sheep';

var player;
var controls;

var healthBar;
var manaBar;
var healthBarFill;
var manaBarFill;

var backgroundSprite;

var items;
var entites;
var gui;

var playerCollisionGroup;
var itemCollisionGroup;
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

    playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
    itemCollisionGroup = this.game.physics.p2.createCollisionGroup();
    entitesCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.game.physics.p2.updateBoundsCollisionGroup();

    this.createControls();
    this.createPlayer();

    gui = this.game.add.group();
    this.createGUI();

    items = this.game.add.group();
    items.enableBody = true;
    items.physicsBodyType = Phaser.Physics.P2JS;

    entites = this.game.add.group();
    entites.enableBody = true;
    entites.physicsBodyType = Phaser.Physics.P2JS;

    for(let i = 0; i < 5; i++) {
      var treeTop = new TreeTop(this.game, 800, 300 + (i*150), 'tree_top');
      var treeBottom = new TreeBottom(this.game, 800, 370 + (i*150), 'tree_bottom');
      items.add(treeTop);
      items.add(treeBottom);
      treeTop.body.dynamic = false;
      treeBottom.body.dynamic = false;
      treeBottom.body.setRectangle(70, 20);
      treeBottom.body.setCollisionGroup(itemCollisionGroup);
      treeBottom.body.collides([itemCollisionGroup, playerCollisionGroup, entitesCollisionGroup]);
    }

    for(let i = 0; i < 5; i++) {
      var treeTop = new TreeTop(this.game, 950, 250 + (i*150), 'tree_top');
      var treeBottom = new TreeBottom(this.game, 950, 320 + (i*150), 'tree_bottom');
      items.add(treeTop);
      items.add(treeBottom);
      treeTop.body.dynamic = false;
      treeBottom.body.dynamic = false;
      treeBottom.body.setRectangle(70, 20);
      treeBottom.body.setCollisionGroup(itemCollisionGroup);
      treeBottom.body.collides([itemCollisionGroup, playerCollisionGroup, entitesCollisionGroup]);
    }


    for(let i = 0; i < 10; i++) {
      var torch = new Torch(this.game, 300, 200 + (i*50), 'torch');
      torch.addToWorld({group: items, object: torch, collisionGroup: itemCollisionGroup,
        collisions: [itemCollisionGroup, playerCollisionGroup, entitesCollisionGroup]});
    }

    for(let i = 0; i < 5; i++) {
      var llama = new Llama(this.game, 400 + (i*30), 400, 'llama');
      llama.addToWorld({group: entites, object: llama, collisionGroup: entitesCollisionGroup,
        collisions: [itemCollisionGroup, playerCollisionGroup, entitesCollisionGroup]});
    }

    for(let i = 0; i < 5; i++) {
      var wolf = new Wolf(this.game, 1500 + (i*30), 400, 'llama');
      wolf.addToWorld({group: entites, object: wolf, collisionGroup: entitesCollisionGroup,
        collisions: [itemCollisionGroup, playerCollisionGroup, entitesCollisionGroup]});
    }

    for(let i = 0; i < 5; i++) {
      var sheep = new Sheep(this.game, 400 + (i*30), 800, 'sheep');
      sheep.addToWorld({group: entites, object: sheep, collisionGroup: entitesCollisionGroup,
        collisions: [itemCollisionGroup, playerCollisionGroup, entitesCollisionGroup]});
    }

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
    controls.use = game.input.mousePointer.leftButton;
    controls.drop = game.input.mousePointer.rightButton;
    controls.pickUp = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
  }

  createGUI() {
    healthBar = gui.create(
      this.game.camera.view.x - (this.game.camera.view.x - 10),
      this.game.camera.view.y - (this.game.camera.view.y - 10),
      'hpmana_bar');

    manaBar = gui.create(
      this.game.camera.view.x - (this.game.camera.view.x - 10),
      this.game.camera.view.y - (this.game.camera.view.y - 25),
      'hpmana_bar');

    healthBar.scale.setTo(1.5, 1.5);
    manaBar.scale.setTo(1.5, 1.5);

    var bmd = game.add.bitmapData(healthBar.width-5, healthBar.height-2);
    bmd.ctx.beginPath();
    bmd.ctx.rect(2, 0, healthBar.width-5, healthBar.height-2);
    bmd.ctx.fillStyle = '#ff0000';
    bmd.ctx.fill();
    healthBarFill = gui.create(
      this.game.camera.view.x - (this.game.camera.view.x - 10),
      this.game.camera.view.y - (this.game.camera.view.y - 10),
      bmd);
    healthBarFill.fullWidth = healthBarFill.width;

    bmd = game.add.bitmapData(manaBar.width-5, manaBar.height-2);
    bmd.ctx.beginPath();
    bmd.ctx.rect(2, 0, manaBar.width-5, manaBar.height-2);
    bmd.ctx.fillStyle = '#0099ff';
    bmd.ctx.fill();
    manaBarFill = gui.create(
      this.game.camera.view.x - (this.game.camera.view.x - 10),
      this.game.camera.view.y - (this.game.camera.view.y - 25),
      bmd);
    manaBarFill.fullWidth = manaBarFill.width;

    healthBar.bringToTop();
    manaBar.bringToTop();
  }

  createPlayer() {
    player = new Player(this.game, this.world.centerX, this.world.centerY, 'warrior');
    this.game.add.existing(player);
    this.game.physics.p2.enable(player, false);
    player.body.fixedRotation = true;
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

    this.game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    this.game.time.events.loop(Phaser.Timer.SECOND, function(){player.health -= 1}, this);
  }

  createPlayerCollisionCallBacks() {
    player.body.collides(itemCollisionGroup, (b1, b2) => {
      console.log("Collided with item!");
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
    this.game.world.bringToTop(items);
    this.game.world.bringToTop(gui);

    this.updateGUI();
    this.updatePlayer();
  }

  updateGUI() {
    if(healthBarFill.width > 0) {
      let healthP = player.health / player.maxHealth;
      healthBarFill.width = (healthP * healthBarFill.fullWidth);
    }

    if(manaBarFill.width > 0) {
      let manaP = player.mana / player.maxMana;
      manaBarFill.width = (manaP * manaBarFill.fullWidth);
    }


    healthBar.x = this.game.camera.view.x + 10;
    healthBar.y = this.game.camera.view.y + 10;
    manaBar.x = this.game.camera.view.x + 10;
    manaBar.y = this.game.camera.view.y + 25;

    healthBarFill.x = this.game.camera.view.x + 10;
    healthBarFill.y = this.game.camera.view.y + 10;
    manaBarFill.x = this.game.camera.view.x + 10;
    manaBarFill.y = this.game.camera.view.y + 25;
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
