import Shrub from '../items/Shrub';
import Torch from '../items/Torch';
import TreeTop from '../items/TreeTop';
import TreeBottom from '../items/TreeBottom';
import Llama from '../entites/Llama';
import Wolf from '../entites/Wolf';
import Sheep from '../entites/Sheep';

import axios from 'axios';

export const forest = (state) => {




  axios.post('http://127.0.0.1:5000/api/v1/game/state').then((res) => {

    console.log(res.data);

    var background = res.data.background;
    var entites = res.data.entites;
    var items = res.data.items;

    state.world.setBounds(0, 0, background.width, background.height);

    state.backgroundSprite = state.game.add.sprite(0, 0, background.key);

    for(let i = 0; i < items.length; i++) {
      let item = items[i];

      if(item.name === "Tree") {
        var treeTop = new TreeTop(state.game, item.position.x, item.position.y, 'tree_top');
        var treeBottom = new TreeBottom(state.game, item.position.x, (item.position.y+70), 'tree_bottom');
        state.itemsGroup.add(treeTop);
        state.itemsGroup.add(treeBottom);
        treeTop.body.dynamic = false;
        treeBottom.body.dynamic = false;
        treeBottom.body.setRectangle(70, 20);
        treeBottom.body.setCollisionGroup(state.itemCollisionGroup);
        treeBottom.body.collides([state.itemCollisionGroup, state.playerCollisionGroup, state.entitesCollisionGroup]);

      }
    }

    for(let i = 0; i < entites.length; i++) {
      var entity = entites[i];

      if(entity.name === "Llama") {
        var llama = new Llama(state.game, entity.position.x, entity.position.y, 'llama');
        llama.addToWorld({group: state.entitesGroup, object: llama, collisionGroup: state.entitesCollisionGroup,
          collisions: [state.itemCollisionGroup, state.playerCollisionGroup, state.entitesCollisionGroup]});
      } else if(entity.name === "Sheep") {
        var sheep = new Sheep(state.game, entity.position.x, entity.position.y, 'sheep');
        sheep.addToWorld({group: state.entitesGroup, object: sheep, collisionGroup: state.entitesCollisionGroup,
          collisions: [state.itemCollisionGroup, state.playerCollisionGroup, state.entitesCollisionGroup]});
      }
    }

    state.player.bringToTop();
    state.game.world.bringToTop(state.entitesGroup);
    state.game.world.bringToTop(state.itemsGroup);
    state.game.world.bringToTop(state.guiGroup);
    state.game.world.bringToTop(state.menuGroup);

    state.isLoading = false;

  }).catch((err) => {
    console.log(err);

    state.world.setBounds(0, 0, 2000, 1000);
    state.backgroundSprite = state.game.add.sprite(0, 0, 'background');

    state.player.bringToTop();
    state.game.world.bringToTop(state.entitesGroup);
    state.game.world.bringToTop(state.itemsGroup);
    state.game.world.bringToTop(state.guiGroup);
    state.game.world.bringToTop(state.menuGroup);

    state.isLoading = false;

  });

  /*var map = {};
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

  for(let i = 0; i < 10; i++) {
    let randX = Math.floor(Math.random() * (2000 - 50)) + 50;
    let randY = Math.floor(Math.random() * (1000 - 50)) + 50;

    var llama = new Llama(state.game, randX, randY, 'llama');

    var skip = false;
    for(let x = 0; x < state.itemsGroup.children.length; x++) {
      if(state.itemsGroup.children[x] instanceof TreeBottom && state.checkOverlap(llama, state.itemsGroup.children[x])) {
        skip = true;
        break;
      }
    }
    if(skip) {
      i--;
      continue;
    };

    map.entites.push({
      "name": "Llama",
      "dynamic": true,
      "mass": 100,
      "position": {
        "x": randX,
        "y": randY
      }
    });

    llama.addToWorld({group: state.entitesGroup, object: llama, collisionGroup: state.entitesCollisionGroup,
      collisions: [state.itemCollisionGroup, state.playerCollisionGroup, state.entitesCollisionGroup]});
  }

  rfor(let i = 0; i < 5; i++) {
    var wolf = new Wolf(state.game, 1500 + (i*30), 400, 'llama');
    wolf.addToWorld({group: state.entitesGroup, object: wolf, collisionGroup: state.entitesCollisionGroup,
      collisions: [state.itemCollisionGroup, state.playerCollisionGroup, state.entitesCollisionGroup]});
  }

  for(let i = 0; i < 5; i++) {
    var sheep = new Sheep(state.game, 400 + (i*30), 800, 'sheep');
    sheep.addToWorld({group: state.entitesGroup, object: sheep, collisionGroup: state.entitesCollisionGroup,
      collisions: [state.itemCollisionGroup, state.playerCollisionGroup, state.entitesCollisionGroup]});
  }

  return map;*/

};
