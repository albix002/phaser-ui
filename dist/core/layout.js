import UIElement from './UIelement.js';
import Phaser from 'phaser';
export default class Layout extends UIElement {
    _graphics;
    _alignment;
    _enableDrawBox;
    _boxStyle;
    _spacing;
    _padding;
    constructor(scene, options) {
        super(scene, options?.x ?? 0, options?.y ?? 0);
        this._graphics = new Phaser.GameObjects.Graphics(scene);
        this.add(this._graphics);
        this._alignment = {
            horizontal: 'center',
            vertical: 'center',
            ...options?.alignment,
        };
        this._boxStyle = {
            lineWidth: 4,
            color: 0xffffff,
            alpha: 1,
            ...options?.boxStyle,
        };
        this._spacing = options?.spacing ?? 10;
        this._padding = options?.padding ?? 15;
        this._enableDrawBox = options?.enableDrawBox ?? false;
    }
    setSpacing(value) {
        if (this._spacing === value)
            return this;
        this._spacing = value;
        this.invalidateLayout();
        return this;
    }
    setPadding(value) {
        if (this._padding === value)
            return this;
        this._padding = value;
        this.invalidateLayout();
        return this;
    }
    addChild(child) {
        super.add(child);
        this.invalidateLayout();
        return this;
    }
    removeChild(child) {
        super.remove(child);
        this.invalidateLayout();
        return this;
    }
    clearChildren() {
        super.removeAll();
        this.invalidateLayout();
        return this;
    }
    getChildren() {
        return this.UIchildren();
    }
    getChildCount() {
        return this.list.length;
    }
    hasChildren() {
        return this.list.length > 0;
    }
    *visibleChildren() {
        for (const child of this.list) {
            if (child instanceof UIElement && child.visible) {
                yield child;
            }
        }
    }
    *UIchildren() {
        for (const child of this.list) {
            if (child instanceof UIElement)
                yield child;
        }
    }
    /**
     * @deprecated
     *
     * Use addChild() method instead
     */
    add(child) {
        super.add(child);
        return this;
    }
    drawBox() {
        this._graphics.lineStyle(this._boxStyle.lineWidth, this._boxStyle.color, this._boxStyle.alpha);
        this._graphics.strokeRect(0, 0, this.width, this.height);
    }
    setChildPosition(child, centerX, centerY) {
        if (child instanceof Layout) {
            child.setPosition(centerX - child.width / 2, centerY - child.height / 2);
        }
        else {
            child.setPosition(centerX, centerY);
        }
    }
    setAlignment(alignment) {
        this._alignment = {
            ...this._alignment,
            ...alignment,
        };
        return this;
    }
    setBoxStyle(style) {
        this._boxStyle = {
            ...this._boxStyle,
            ...style,
        };
        return this;
    }
    set enableBox(val) {
        this._enableDrawBox = val;
    }
}
//# sourceMappingURL=layout.js.map