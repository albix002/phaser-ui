import Layout from '../core/layout.js';
export default class Vbox extends Layout {
    _spacing = 15;
    _padding = 10;
    _alignment;
    constructor(scene, options) {
        super(scene, options.x ?? 0, options.y ?? 0);
        this._spacing = options.spacing ?? 15;
        this._padding = options.padding ?? 15;
        this._alignment = options.alignment ?? 'center';
    }
    layout() {
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
//# sourceMappingURL=Vbox.js.map