import Shrub from '../items/Shrub';
import Torch from '../items/Torch';
import TreeTop from '../items/TreeTop';
import TreeBottom from '../items/TreeBottom';
import Llama from '../entites/Llama';
import Wolf from '../entites/Wolf';
import Sheep from '../entites/Sheep';

export const forest = (state) => {

  var map = {};
  map.entites = [];
  map.items = [];
  map.background = {
    "x": 0,
    "y": 0,
    "key": 'background'
  };

  state.backgroundSprite = state.game.add.sprite(0, 0, 'background');

  for(let y = 50; y < 1000; y+=150) {
    for(let x = 50; x < 2000; x+=150) {
      let rand = Math.floor(Math.random() * (100 - 5)) + 5;

      var treeTop = new TreeTop(state.game, x+rand, y-rand, 'tree_top');
      var treeBottom = new TreeBottom(state.game, x+rand, (y+70)-rand, 'tree_bottom');

      var skip = false;
      for(let i = 0; i < state.itemsGroup.children.length; i++) {
        if(state.itemsGroup.children[i] instanceof TreeBottom && state.checkOverlap(treeBottom, state.itemsGroup.children[i])) {
          skip = true;
          break;
        }
      }
      if(skip) continue;

      state.itemsGroup.add(treeTop);
      state.itemsGroup.add(treeBottom);
      treeTop.body.dynamic = false;
      treeBottom.body.dynamic = false;
      treeBottom.body.setRectangle(70, 20);
      treeBottom.body.setCollisionGroup(state.itemCollisionGroup);
      treeBottom.body.collides([state.itemCollisionGroup, state.playerCollisionGroup, state.entitesCollisionGroup]);

      map.items.push({
        "name": "Tree",
        "dynamic": false,
        "mass": null,
        "position": {
          "x": x+rand,
          "y": y-rand
        }
      });
    }
  }

  for(let i = 0; i < 5; i++) {
    var llama = new Llama(state.game, 400 + (i*30), 400, 'llama');
    llama.addToWorld({group: state.entitesGroup, object: llama, collisionGroup: state.entitesCollisionGroup,
      collisions: [state.itemCollisionGroup, state.playerCollisionGroup, state.entitesCollisionGroup]});
  }

  for(let i = 0; i < 5; i++) {
    var wolf = new Wolf(state.game, 1500 + (i*30), 400, 'llama');
    wolf.addToWorld({group: state.entitesGroup, object: wolf, collisionGroup: state.entitesCollisionGroup,
      collisions: [state.itemCollisionGroup, state.playerCollisionGroup, state.entitesCollisionGroup]});
  }

  for(let i = 0; i < 5; i++) {
    var sheep = new Sheep(state.game, 400 + (i*30), 800, 'sheep');
    sheep.addToWorld({group: state.entitesGroup, object: sheep, collisionGroup: state.entitesCollisionGroup,
      collisions: [state.itemCollisionGroup, state.playerCollisionGroup, state.entitesCollisionGroup]});
  }

  return map;

};
