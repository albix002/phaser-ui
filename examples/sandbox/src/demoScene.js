import Phaser from 'phaser';
import { Button, VBox, Panel, DefaultTheme } from '../node_modules/phaser-ui/dist/index.js';

export default class DemoScene extends Phaser.Scene {
  create() {
    const purple = DefaultTheme.button.purple;
    const button = new Button(this, {
      text: 'Play',
      variant: 'purple',
      x: 100,
      y: 100,

      style: { ...purple, normal: { ...purple.normal, panel: { ...purple.normal.panel, background: 0xffffff } } },
    });

    button.validate();

    button.onClick(() => {
      if (button.getText() === 'Play') button.setText('ciao');
      else button.setText('Play');
    });
  }
}
