import Phaser from 'phaser';
import UIElement from './UIelement.js';
/**
 * Root container of the UI system.
 *
 * Responsible for validating UI elements every frame.
 */
export default class UI extends Phaser.GameObjects.Container {
    _dirty = true;
    constructor(scene) {
        super(scene);
        scene.add.existing(this);
        this.addToUpdateList();
    }
    validateLayout() {
        if (!this._dirty)
            return;
        this.validateChildren();
        this._dirty = false;
    }
    preUpdate() {
        this.validateLayout();
    }
    invalidateLayout() {
        if (this._dirty)
            return;
        this._dirty = true;
    }
    validateChildren() {
        for (const child of this.list) {
            if (child instanceof UIElement)
                child.validateLayout();
        }
    }
    getMaxWidth(elements) {
        let maxWidth = 0;
        for (const element of elements) {
            element.validateLayout();
            maxWidth = Math.max(maxWidth, element.width);
        }
        return maxWidth;
    }
    /**
     * @internal
     * Used only for debugging and testing.
     */
    getDirty() {
        return this._dirty;
    }
}
//# sourceMappingURL=UI.js.map