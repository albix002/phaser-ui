import Layout, { VerticalAlignment } from '../core/layout.js';

interface HboxOptions {
  x?: number;
  y?: number;

  alignment?: VerticalAlignment;
  padding?: number;
  spacing?: number;
}

export default class Hbox extends Layout {
  protected override _padding = 10;
  protected override _spacing = 15;

  private _alignment: VerticalAlignment;

  constructor(scene: Phaser.Scene, options: HboxOptions) {
    super(scene, options.x ?? 0, options.y ?? 0);

    this._spacing = options.spacing ?? 15;
    this._padding = options.padding ?? 15;
    this._alignment = options.alignment ?? 'center';
  }
  protected override layout(): void {
    let x = this._padding;
    let maxHeight = 0;

    for (const child of this.visibleChildren()) {
      child.validateLayout();
      switch (this._alignment) {
        case 'top':
          child.y = this._padding;
          break;

        case 'center':
          child.y = this._padding + (maxHeight - child.width) / 2;
          break;

        case 'bottom':
          child.y = this._padding + maxHeight - child.width;
          break;
      }
    }

    const centerX = this._padding + maxHeight / 2;

    let first = true;

    for (const child of this.visibleChildren()) {
      if (!first) {
        x += this._spacing;
      }

      first = false;

      const centerY = x + child.height / 2;

      child.setPosition(centerX, centerY);

      x += child.height;
    }

    this.setSize(maxHeight + this._padding * 2, x + this._padding);
  }
}
