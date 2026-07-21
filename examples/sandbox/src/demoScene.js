import Phaser from 'phaser';
import { UI, Panel, VBox, Label, Button } from '../../../dist/index.js';

export default class DemoScene extends Phaser.Scene {
  create() {
    this.ui = new UI(this);

    //
    // PANEL AUTO SIZE
    //
    const panel = new Panel(this, {
      x: 50,
      y: 50,
    });

    panel.setLayout(new VBox(this));

    const label = new Label(this, {
      text: '0',
    });

    panel.addChild(label);

    //
    // BUTTON
    //
    const button = new Button(this, {
      x: 50,
      y: 200,
      text: 'Increment',
      variant: 'purple',
    });

    let value = 0;

    button.onClick(() => {
      label.setText('110');

      this.ui?.validateLayout();

      console.log(panel.width);
    });
    //
    // BUTTON AUTO SIZE TEST
    //
    const button2 = new Button(this, {
      x: 50,
      y: 300,
      text: 'Play',
      variant: 'purple',
    });

    button2.onClick(() => {
      if (button2.getText() === 'Play') button2.setText('A much longer button text');
      else button2.setText('Play');

      console.log('button2:', button2.width, button2.height);
    });

    this.ui.add([panel, button, button2]);
  }
}
