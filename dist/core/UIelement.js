import Phaser from 'phaser';
export function isLayoutNode(obj) {
    return obj != null && typeof obj.invalidateLayout === 'function';
}
export default class UIElement extends Phaser.GameObjects.Container {
    _dirty = true;
    _enabled = true;
    constructor(scene, x = 0, y = 0) {
        super(scene, x, y);
        scene.add.existing(this);
    }
    invalidateLayout() {
        if (this._dirty)
            return;
        this._dirty = true;
        const parent = this.parentContainer;
        if (isLayoutNode(parent))
            parent.invalidateLayout();
    }
    validateLayout() {
        if (!this._dirty)
            return;
        this.layout();
        this._dirty = false;
    }
    setEnabled(enabled) {
        if (this._enabled === enabled)
            return this;
        this._enabled = enabled;
        return this;
    }
    updateHitArea() {
        let rect = this.input?.hitArea;
        if (!rect) {
            rect = new Phaser.Geom.Rectangle();
            this.setInteractive(rect, Phaser.Geom.Rectangle.Contains);
        }
        rect.setTo(0, 0, this.width, this.height);
    }
    isEnabled() {
        return this._enabled;
    }
    getSize() {
        this.validateLayout();
        return { w: this.width, h: this.height };
    }
    setMeasuredSize(width, height) {
        if (width === this.width && height === this.height)
            return;
        super.setSize(width, height);
        this.onSizeChanged();
        this.invalidateLayout();
        const parent = this.parentContainer;
        if (isLayoutNode(parent)) {
            parent.invalidateLayout();
        }
    }
    setVisible(value) {
        if (this.visible === value) {
            return this;
        }
        super.setVisible(value);
        const parent = this.parentContainer;
        if (isLayoutNode(parent)) {
            parent.invalidateLayout();
        }
        return this;
    }
    onSizeChanged() { }
}
//# sourceMappingURL=UIelement.js.map