import UIElement from '../core/UIelement.js';
import { DefaultTheme } from '../themes/Theme.js';
import Phaser from 'phaser';
export default class Panel extends UIElement {
    _graphics;
    _layout = null;
    _style;
    _autoSize;
    _contentPadding = 0;
    _backgroundDirty = true;
    _padding = null;
    _alignment = {
        horizontal: 'left',
        vertical: 'top',
    };
    align(alignment, container, content) {
        switch (alignment) {
            case 'left':
                return -container / 2;
            case 'center':
                return -content / 2;
            case 'right':
                return container / 2 - content;
        }
    }
    valign(alignment, container, content) {
        switch (alignment) {
            case 'top':
                return -container / 2;
            case 'center':
                return -content / 2;
            case 'bottom':
                return container / 2 - content;
        }
    }
    constructor(scene, options) {
        super(scene, options.x ?? 0, options.y ?? 0);
        this._alignment = {
            horizontal: 'left',
            vertical: 'top',
            ...options.alignment,
        };
        this._graphics = new Phaser.GameObjects.Graphics(scene);
        this.add(this._graphics);
        this._style = options.style ?? DefaultTheme.panel;
        super.setSize(options.width ?? 0, options.height ?? 0);
        this._autoSize = options.autoSize ?? true;
        this._padding = options.padding ?? null;
    }
    setLayout(layout) {
        this.detachLayout();
        this._layout = layout;
        if (this._padding !== null)
            this._layout.setPadding(this._padding);
        this.add(layout);
        this.invalidateLayout();
        return this;
    }
    removeLayout() {
        this.detachLayout();
        this.invalidateLayout();
        return this;
    }
    detachLayout() {
        if (!this._layout)
            return;
        this.remove(this._layout);
        this._layout = null;
    }
    layout() {
        if (this._layout) {
            const size = this._layout.getSize();
            if (this._autoSize) {
                const width = size.w + this._contentPadding;
                const height = size.h + this._contentPadding;
                if (width !== this.width || height !== this.height) {
                    this.setMeasuredSize(width, height);
                }
            }
            this.updateLayoutPosition(size);
        }
        if (this._backgroundDirty) {
            this.drawBackground();
            this._backgroundDirty = false;
        }
    }
    drawBackground() {
        console.log('draw', this.width, this.height);
        this._graphics.clear();
        this._graphics.fillStyle(this._style.background, this._style.alpha);
        this._graphics.lineStyle(this._style.borderWidth, this._style.border, this._style.alpha);
        this._graphics.fillRoundedRect(-this.width / 2, -this.height / 2, this.width, this.height, this._style.radius);
        this._graphics.strokeRoundedRect(-this.width / 2, -this.height / 2, this.width, this.height, this._style.radius);
    }
    setMeasuredSize(width, height) {
        if (width !== this.width || height !== this.height) {
            this._backgroundDirty = true;
        }
        super.setMeasuredSize(width, height);
    }
    setSize(width, height) {
        super.setSize(width, height);
        this._backgroundDirty = true;
        this.invalidateLayout();
        this._autoSize = false;
        return this;
    }
    updateLayoutPosition(size) {
        if (this._autoSize) {
            this.getLayout().setPosition(-this.width / 2, -this.height / 2);
            return;
        }
        this.getLayout().setPosition(this.align(this._alignment.horizontal, this.width, size.w), this.valign(this._alignment.vertical, this.height, size.h));
    }
    addChild(child) {
        this.getLayout().addChild(child);
        this.invalidateLayout();
        return this;
    }
    removeChild(child) {
        this.getLayout().removeChild(child);
        this.invalidateLayout();
        return this;
    }
    clearChildren() {
        this.getLayout().clearChildren();
        this.invalidateLayout();
        return this;
    }
    getLayout() {
        if (!this._layout) {
            throw new Error('Panel has no layout.');
        }
        return this._layout;
    }
    getChildren() {
        return this.getLayout().getChildren();
    }
    getChildCount() {
        return this.getLayout().getChildCount();
    }
    hasChildren() {
        return this.getLayout().hasChildren();
    }
    hasLayout() {
        return this._layout !== null;
    }
    setStyle(panel) {
        this._style = panel;
        this._backgroundDirty = true;
        this.invalidateLayout();
        return this;
    }
    getDirty() {
        return this._dirty;
    }
    setAutoSize(enabled, padding = 0) {
        if (this._autoSize === enabled && this._contentPadding === padding) {
            return this;
        }
        this._autoSize = enabled;
        this._contentPadding = padding;
        this.invalidateLayout();
        return this;
    }
    setPadding(padding) {
        this.getLayout().setPadding(padding);
        return this;
    }
    setAlignment(alignment) {
        this._alignment = {
            ...this._alignment,
            ...alignment,
        };
        this.invalidateLayout();
        return this;
    }
}
//# sourceMappingURL=panel.js.map