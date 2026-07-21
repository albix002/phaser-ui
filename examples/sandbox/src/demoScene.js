import Phaser from 'phaser';
import { Button, VBox, Panel } from 'phaser-ui';

export default class DemoScene extends Phaser.Scene {
  create() {
    const panel = new Panel(this, { height: 300, width: 200, x: 100, y: 100 });

    const button = new Button(this, {
      text: 'Play',
      variant: 'green',
    });

    panel.addChild(button);
  }
}
