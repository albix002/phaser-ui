import UIElement from '../core/UIelement.js';
import Phaser from 'phaser';
import { LabelStyle } from '../themes/Theme.js';
export interface LabelOptions {
    x?: number;
    y?: number;
    text: string;
    style?: LabelStyle;
}
export default class Label extends UIElement {
    private readonly _textObject;
    private _style;
    constructor(scene: Phaser.Scene, options: LabelOptions);
    getStyle(): LabelStyle;
    protected layout(): void;
    setText(text: string): this;
    getText(): string;
    private createTextStyle;
    setStyle(label: LabelStyle): void;
}
//# sourceMappingURL=label.d.ts.map