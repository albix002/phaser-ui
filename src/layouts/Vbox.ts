import Layout from '../core/layout.js';

export default class Vbox extends Layout {
  protected override layout(): void {
    let y = this._padding;
    let maxWidth = 0;

    for (const child of this.visibleChildren()) {
      child.validateLayout();
      maxWidth = Math.max(maxWidth, child.width);
    }
    let posX = 0;

    let first = true;

    for (const child of this.visibleChildren()) {
      if (!first) y += this._spacing;

      first = false;

      const centerY = y + child.height / 2;
      switch (this._alignment.horizontal) {
        case 'left':
          posX = this._padding + child.width / 2;
          break;
        case 'center':
          posX = this._padding + maxWidth / 2;
          break;
        case 'right':
          posX = maxWidth - this._padding - child.width / 2;
          break;
      }

      this.setChildPosition(child, posX, centerY);
      y += child.height;
    }

    this.setSize(maxWidth + this._padding * 2, y + this._padding);
    if (this._enableDrawBox) this.drawBox();
  }
}
