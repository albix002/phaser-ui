import Phaser from 'phaser';
import { Button, VBox, Panel } from 'phaser-ui';

export default class DemoScene extends Phaser.Scene {
  create() {
    const button = new Button(this, {
      text: 'Play',
      variant: 'green',
      x: 100,
      y: 100,
    });

    button.validate();
  }
}
