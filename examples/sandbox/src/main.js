import Phaser from 'phaser';
import DemoScene from './demoScene.js';

/** @type {Phaser.Types.Core.GameConfig} */
const gameConfig = {
  scale: {
    height: 600,
    width: 1000,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  parent: 'game',
  scene: [DemoScene],
  antialias: false,
  roundPixels: true,
};

const game = new Phaser.Game(gameConfig);
