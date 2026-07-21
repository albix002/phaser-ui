import Phaser from 'phaser';
import DemoScene from './demoScene';

/** @type {Phaser.Types.Core.GameConfig} */
const gameConfig = {
  scale: {
    height: 600,
    width: 1000,
    mode: Phaser.Scale.FIT,
  },
  parent: 'game',
  scene: [DemoScene],
  antialias: false,
  roundPixels: true,
};

const game = new Phaser.Game(gameConfig);
