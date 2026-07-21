import Layout from '../core/layout.js';
import UIElement from '../core/UIelement.js';

export default class Hbox extends Layout {
  protected override layout(): void {
    let x = this._padding;
    const y = this._padding;

    let maxHeight = 0;

    for (const [index, child] of this.list.entries()) {
      if (!(child instanceof UIElement)) {
        continue;
      }

      if (index > 0) {
        x += this._spacing;
      }
      child.validateLayout();

      child.x = x;
      child.y = y;

      maxHeight = Math.max(maxHeight, child.height);

      x += child.width;
    }

    this.setSize(x + this._padding, maxHeight + this._padding * 2);
  }
}
