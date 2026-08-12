import Layout from '../core/layout.js';

export default class Hbox extends Layout {
  protected override layout(): void {
    let x = this._padding;
    let maxHeight = 0;

    for (const child of this.visibleChildren()) {
      child.validateLayout();
      maxHeight = Math.max(maxHeight, child.height);
    }
    let posY = 0;

    let first = true;

    for (const child of this.visibleChildren()) {
      if (!first) x += this._spacing;

      first = false;

      const centerX = x + child.width / 2;

      switch (this._alignment.vertical) {
        case 'top':
          posY = this._padding + child.height / 2;
          break;
        case 'center':
          posY = this._padding + maxHeight / 2;
          break;
        case 'bottom':
          posY = maxHeight - this._padding - child.height / 2;
          break;
      }
      this.setChildPosition(child, centerX, posY);
      x += child.width;
    }

    this.setSize(x + this._padding, maxHeight + this._padding * 2);
    if (this._enableDrawBox) this.drawBox();
  }
}
