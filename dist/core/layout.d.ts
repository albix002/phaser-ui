import UIElement from './UIelement.js';
import Phaser from 'phaser';
export type HorizontalAlignment = 'left' | 'center' | 'right';
export type VerticalAlignment = 'top' | 'center' | 'bottom';
export interface ContentAlignment {
    horizontal: HorizontalAlignment;
    vertical: VerticalAlignment;
}
export default abstract class Layout extends UIElement {
    constructor(scene: Phaser.Scene, x?: number, y?: number);
    protected _spacing: number;
    protected _padding: number;
    setSpacing(value: number): this;
    setPadding(value: number): this;
    addChild(child: UIElement): this;
    removeChild(child: UIElement): this;
    clearChildren(): this;
    getChildren(): Phaser.GameObjects.GameObject[];
    getChildCount(): number;
    hasChildren(): boolean;
    protected abstract layout(): void;
    protected visibleChildren(): Iterable<UIElement>;
    /**
     * @deprecated
     *
     * Use addChild() method instead
     */
    add(child: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[]): this;
}
//# sourceMappingURL=layout.d.ts.map