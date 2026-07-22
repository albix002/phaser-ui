import Layout from '../core/layout.js';
export default class Vbox extends Layout {
    _spacing = 15;
    _padding = 10;
    layout() {
        let y = this._padding;
        let maxWidth = 0;
        for (const child of this.visibleChildren()) {
            child.validateLayout();
            maxWidth = Math.max(maxWidth, child.width);
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
//# sourceMappingURL=Vbox.js.map