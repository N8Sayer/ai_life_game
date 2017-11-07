import Shrub from '../items/Shrub';
import Torch from '../items/Torch';
import TreeTop from '../items/TreeTop';
import TreeBottom from '../items/TreeBottom';
import Llama from '../entites/Llama';
import Wolf from '../entites/Wolf';
import Sheep from '../entites/Sheep';

import axios from 'axios';

export const loadRealm = (state) => {

  axios.post('http://127.0.0.1:5000/api/v1/game/state').then((res) => {

    console.log(res.data);

    if(!res.data.background) {
      window.location.href = 'http://127.0.0.1:5000' + res.data;
      Promise.reject();
    } else {

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

    }

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
};
