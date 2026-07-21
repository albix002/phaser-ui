import Layout from '../core/layout.js';
import UIElement from '../core/UIelement.js';

export default class Vbox extends Layout {
  protected override _spacing = 15;
  protected override _padding = 10;

  protected override layout(): void {
    let y = this._padding;
    let maxWidth = 0;

    for (const child of this.list) {
      if (!(child instanceof UIElement)) continue;

      child.validateLayout();
      maxWidth = Math.max(maxWidth, child.width);
    }

    const centerX = this._padding + maxWidth / 2;

    for (const [index, child] of this.list.entries()) {
      if (!(child instanceof UIElement)) continue;

      if (index > 0) {
        y += this._spacing;
      }

      const centerY = y + child.height / 2;

      child.setPosition(centerX, centerY);

      y += child.height;
    }

    this.setSize(maxWidth + this._padding * 2, y + this._padding);
  }
}
