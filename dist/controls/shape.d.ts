import Phaser from 'phaser';
import UIElement from '../core/UIelement.js';
import { PanelStyle } from '../themes/Theme.js';
export default class Shape extends UIElement {
    private readonly _graphics;
    private _style;
    private _dirtyGraphics;
    constructor(scene: Phaser.Scene, style: PanelStyle, x?: number, y?: number);
    protected layout(): void;
    setStyle(style: PanelStyle): this;
    protected onSizeChanged(): void;
    setMeasuredSize(width: number, height: number): void;
    private redraw;
}
//# sourceMappingURL=shape.d.ts.map