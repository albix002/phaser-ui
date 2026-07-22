import Phaser from 'phaser';
import UIElement, { ILayoutNode } from './UIelement.js';
/**
 * Root container of the UI system.
 *
 * Responsible for validating UI elements every frame.
 */
export default class UI extends Phaser.GameObjects.Container implements ILayoutNode {
    private _dirty;
    constructor(scene: Phaser.Scene);
    validateLayout(): void;
    preUpdate(): void;
    invalidateLayout(): void;
    private validateChildren;
    getMaxWidth(elements: UIElement[]): number;
    /**
     * @internal
     * Used only for debugging and testing.
     */
    getDirty(): boolean;
}
//# sourceMappingURL=UI.d.ts.map