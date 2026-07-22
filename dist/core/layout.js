import UIElement from './UIelement.js';
export default class Layout extends UIElement {
    constructor(scene, x = 0, y = 0) {
        super(scene, x, y);
    }
    _spacing = 0;
    _padding = 0;
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
        return [...this.list];
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
    /**
     * @deprecated
     *
     * Use addChild() method instead
     */
    add(child) {
        super.add(child);
        return this;
    }
}
//# sourceMappingURL=layout.js.map