import UIElement from '../core/UIelement.js';
export default class Shape extends UIElement {
    _graphics;
    _style;
    _dirtyGraphics = true;
    constructor(scene, style, x = 0, y = 0) {
        super(scene, x, y);
        this._graphics = scene.add.graphics();
        this.add(this._graphics);
        this._style = style;
    }
    layout() {
        if (!this._dirtyGraphics)
            return;
        this.redraw();
        this._dirtyGraphics = false;
    }
    setStyle(style) {
        this._style = style;
        this._dirtyGraphics = true;
        this.invalidateLayout();
        return this;
    }
    onSizeChanged() {
        this._dirtyGraphics = true;
    }
    setMeasuredSize(width, height) {
        const changed = width !== this.width || height !== this.height;
        super.setMeasuredSize(width, height);
        if (changed) {
            this._dirtyGraphics = true;
        }
    }
    redraw() {
        this._graphics.clear();
        this._graphics.fillStyle(this._style.background);
        if (this._style.borderWidth > 0) {
            this._graphics.lineStyle(this._style.borderWidth, this._style.border);
        }
        this._graphics.fillRoundedRect(-this.width / 2, -this.height / 2, this.width, this.height, this._style.radius);
        if (this._style.borderWidth > 0) {
            this._graphics.strokeRoundedRect(-this.width / 2, -this.height / 2, this.width, this.height, this._style.radius);
        }
    }
}
//# sourceMappingURL=shape.js.map