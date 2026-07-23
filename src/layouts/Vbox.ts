import Layout, { HorizontalAlignment } from '../core/layout.js';
import Phaser from 'phaser';

interface VBoxOptions {
  x?: number;
  y?: number;

  alignment?: HorizontalAlignment;
  padding?: number;
  spacing?: number;
}

export default class Vbox extends Layout {
  protected override _spacing = 15;
  protected override _padding = 10;
  private _alignment: HorizontalAlignment;

  constructor(scene: Phaser.Scene, options: VBoxOptions) {
    super(scene, options.x ?? 0, options.y ?? 0);

    this._spacing = options.spacing ?? 15;
    this._padding = options.padding ?? 15;
    this._alignment = options.alignment ?? 'center';
  }

  protected override layout(): void {
    let y = this._padding;
    let maxWidth = 0;

    for (const child of this.visibleChildren()) {
      child.validateLayout();
      switch (this._alignment) {
        case 'left':
          child.x = this._padding;
          break;

        case 'center':
          child.x = this._padding + (maxWidth - child.width) / 2;
          break;

        case 'right':
          child.x = this._padding + maxWidth - child.width;
          break;
      }
    }

    const centerX = this._padding + maxWidth / 2;

    let first = true;

    for (const child of this.visibleChildren()) {
      if (!first) {
        y += this._spacing;
      }

      first = false;

      const centerY = y + child.height / 2;

      child.setPosition(centerX, centerY);

      y += child.height;
    }

    this.setSize(maxWidth + this._padding * 2, y + this._padding);
  }
}
