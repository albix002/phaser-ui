import Layout from '../core/layout.js';
export default class Hbox extends Layout {
    _padding = 10;
    _spacing = 15;
    _alignment;
    constructor(scene, options) {
        super(scene, options.x ?? 0, options.y ?? 0);
        this._spacing = options.spacing ?? 15;
        this._padding = options.padding ?? 15;
        this._alignment = options.alignment ?? 'center';
    }
    layout() {
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
//# sourceMappingURL=Hbox.js.map