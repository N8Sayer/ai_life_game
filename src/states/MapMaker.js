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
var menu;

var backgroundSprite;

var items;
var entites;
var gui;
var menuGroup;

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
    this.stage.disableVisibilityChange = true;
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
    menuGroup = this.game.add.group();
    menuGroup.visible = false;

    this.createGUI();

    items = this.game.add.group();
    items.enableBody = true;
    items.physicsBodyType = Phaser.Physics.P2JS;

    entites = this.game.add.group();
    entites.enableBody = true;
    entites.physicsBodyType = Phaser.Physics.P2JS;

    for(let y = 200; y < 1000; y+=150) {
      for(let x = 200; x < 2000; x+=150) {
        var treeTop = new TreeTop(this.game, x, y, 'tree_top');
        var treeBottom = new TreeBottom(this.game, x, y+70), 'tree_bottom');
        items.add(treeTop);
        items.add(treeBottom);
        treeTop.body.dynamic = false;
        treeBottom.body.dynamic = false;
        treeBottom.body.setRectangle(70, 20);
        treeBottom.body.setCollisionGroup(itemCollisionGroup);
        treeBottom.body.collides([itemCollisionGroup, playerCollisionGroup, entitesCollisionGroup]);
      }
    }

    /*for(let i = 0; i < 5; i++) {
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
    }*/


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
      select: null,
      place: null,
      cancel: null,
      undo: null
    }

    controls.up = game.input.keyboard.addKey(Phaser.KeyCode.W);
    controls.down = game.input.keyboard.addKey(Phaser.KeyCode.S);
    controls.left = game.input.keyboard.addKey(Phaser.KeyCode.A);
    controls.right = game.input.keyboard.addKey(Phaser.KeyCode.D);
    controls.select = game.input.mousePointer.leftButton;
    controls.place = game.input.mousePointer.rightButton;
    controls.cancel = game.input.keyboard.addKey(Phaser.KeyCode.C);
    controls.undo = game.input.keyboard.addKey(Phaser.KeyCode.U);
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
    this.game.world.bringToTop(menuGroup);
  }
  /*
  #####################################################################################################################
  #####################################################################################################################
  #####################################################################################################################
  #####################################################################################################################
  */

  render () {}
}
