import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.image('mushroom', 'assets/images/mushroom2.png')
    this.load.image('ash', 'assets/images/ash.png')
    this.load.image('spark', 'assets/images/spark.png')
    this.load.image('background', 'assets/images/background.png')
    this.load.image('character', 'assets/images/character.png')
    this.load.image('shrub', 'assets/images/shrub.png')
    this.load.image('hpmana_bar', 'assets/images/gui/hp-mana bar.png')

    this.load.spritesheet('torch', 'assets/images/torch.png', 32, 49, 6);
  }

  create () {
    this.state.start('Game')
  }
}
