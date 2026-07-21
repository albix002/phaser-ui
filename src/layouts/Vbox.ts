import Layout from '../core/layout.js';
import UIElement from '../core/UIelement.js';

export default class Vbox extends Layout {
  protected override _spacing = 15;

  protected override layout(): void {
    let y = this._padding;
    let maxWidth = 0;

    for (const child of this.list) {
      if (!(child instanceof UIElement)) continue;

      child.validate();

      maxWidth = Math.max(maxWidth, child.width);
    }

    const x = 0;

    for (const [index, child] of this.list.entries()) {
      if (!(child instanceof UIElement)) continue;

      if (index > 0) {
        y += this._spacing;
      }

      y += child.height / 2;

      child.setPosition(x, y);

      y += child.height / 2;
    }

    this.setSize(maxWidth + this._padding * 2, y + this._padding);
  }
}
