import Phaser from 'phaser';
import { UI, Panel, Vbox, Label, Button, Hbox } from '../../../dist/index.js';

export default class DemoScene extends Phaser.Scene {
  constructor() {
    super('Demo');
  }
  create() {
    this.ui = new UI(this);

    //
    // PANEL AUTO SIZE
    //
    const panel = new Panel(this, {
      x: 50,
      y: 50,
      style: {
        borderWidth: 0,
      },
    });

    panel.setLayout(new Vbox(this));

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
      style: {
        borderWidth: 0,
      },
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
      style: {
        borderWidth: 0,
      },
    });

    button2.onClick(() => {
      if (button2.getText() === 'Play') button2.setText('A much longer button text');
      else button2.setText('Play');

      console.log('button2:', button2.width, button2.height);
    });

    const panelLayout = new Panel(this, {
      x: this.scale.width / 2,
      y: this.scale.height / 2,
    });

    const box = new Vbox(this, {
      alignment: {
        horizontal: 'center',
      },

      enableDrawBox: true,
    });

    panelLayout
      .setLayout(box)
      .addChild(
        new Label(this, {
          text: "Looks like I've got an Ace showing. Want to take insurance?",
          style: {
            color: '#d3c100',
            fontFamily: 'Pixeloid',
            fontSize: 20,
          },
        }),
      )
      .addChild(
        new Label(this, {
          text: 'Insurance costs half of your original bet and pays 2:1 if I have Blackjack.',
          style: {
            color: '#d3c100',
            fontFamily: 'Pixeloid',
            fontSize: 20,
          },
        }),
      )
      .addChild(
        new Hbox(this, {
          spacing: 50,
        })
          .addChild(
            new Button(this, {
              text: 'Yes',
              variant: 'green',
            }),
          )
          .addChild(new Button(this, { text: 'No' })),
      );

    this.ui.add([panel, button, button2, panelLayout]);
  }
}
