import UIElement from './UIelement.js';
import Phaser from 'phaser';
export type HorizontalAlignment = 'left' | 'center' | 'right';
export type VerticalAlignment = 'top' | 'center' | 'bottom';
export interface ContentAlignment {
    horizontal: HorizontalAlignment;
    vertical: VerticalAlignment;
}
export interface BoxStyle {
    lineWidth?: number;
    color?: number;
    alpha?: number;
}
export interface LayoutOptions {
    alignment?: Partial<ContentAlignment>;
    enableDrawBox?: boolean;
    x?: number;
    y?: number;
    boxStyle?: BoxStyle;
    padding?: number;
    spacing?: number;
}
export default abstract class Layout extends UIElement {
    protected readonly _graphics: Phaser.GameObjects.Graphics;
    protected _alignment: ContentAlignment;
    protected _enableDrawBox: boolean;
    protected _boxStyle: BoxStyle;
    protected _spacing: number;
    protected _padding: number;
    constructor(scene: Phaser.Scene, options?: LayoutOptions);
    setSpacing(value: number): this;
    setPadding(value: number): this;
    addChild(child: UIElement): this;
    removeChild(child: UIElement): this;
    clearChildren(): this;
    getChildren(): Iterable<UIElement>;
    getChildCount(): number;
    hasChildren(): boolean;
    protected abstract layout(): void;
    protected visibleChildren(): Iterable<UIElement>;
    protected UIchildren(): Iterable<UIElement>;
    /**
     * @deprecated
     *
     * Use addChild() method instead
     */
    add(child: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[]): this;
    protected drawBox(): void;
    protected setChildPosition(child: UIElement, centerX: number, centerY: number): void;
    setAlignment(alignment: Partial<ContentAlignment>): this;
    setBoxStyle(style: BoxStyle): this;
    set enableBox(val: boolean);
}
//# sourceMappingURL=layout.d.ts.map