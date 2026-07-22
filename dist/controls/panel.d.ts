import Layout, { ContentAlignment } from '../core/layout.js';
import UIElement from '../core/UIelement.js';
import { PanelStyle } from '../themes/Theme.js';
import Phaser from 'phaser';
export interface PanelOptions {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    autoSize?: boolean;
    padding?: number;
    style?: PanelStyle;
    alignment?: Partial<ContentAlignment>;
}
export default class Panel extends UIElement {
    private readonly _graphics;
    private _layout;
    private _style;
    private _autoSize;
    private _contentPadding;
    private _backgroundDirty;
    private _padding;
    private _alignment;
    private align;
    private valign;
    constructor(scene: Phaser.Scene, options: PanelOptions);
    setLayout(layout: Layout): this;
    removeLayout(): this;
    private detachLayout;
    protected layout(): void;
    private drawBackground;
    setMeasuredSize(width: number, height: number): void;
    setSize(width: number, height: number): this;
    private updateLayoutPosition;
    addChild(child: UIElement): this;
    removeChild(child: UIElement): this;
    clearChildren(): this;
    private getLayout;
    getChildren(): Phaser.GameObjects.GameObject[];
    getChildCount(): number;
    hasChildren(): boolean;
    hasLayout(): boolean;
    setStyle(panel: PanelStyle): this;
    getDirty(): boolean;
    setAutoSize(enabled: boolean, padding?: number): this;
    setPadding(padding: number): this;
    setAlignment(alignment: Partial<ContentAlignment>): this;
}
//# sourceMappingURL=panel.d.ts.map