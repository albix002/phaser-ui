import UIElement from '../core/UIelement.js';
import Phaser from 'phaser';
import { ButtonStyle, ButtonVariant, ButtonVisualStyle, DeepPartial } from '../themes/Theme.js';
export declare enum ButtonState {
    Normal = 0,
    Hover = 1,
    Pressed = 2,
    Disabled = 3
}
export interface ButtonOptions {
    x?: number;
    y?: number;
    text?: string;
    variant?: ButtonVariant;
    style?: DeepPartial<ButtonStyle>;
}
export default class Button extends UIElement {
    private _buttonState;
    private readonly _background;
    private readonly _label;
    private readonly _style;
    private _variant;
    private readonly _clickListeners;
    private _widthExplicit;
    private _heightExplicit;
    constructor(scene: Phaser.Scene, options: ButtonOptions);
    setEnabled(enabled: boolean): this;
    private fireClick;
    protected layout(): void;
    setText(text: string): this;
    onClick(callback: () => void): this;
    setStyle(style: ButtonVisualStyle): void;
    private changeState;
    private applyCurrentStyle;
    getText(): string;
    updateSize(config: {
        w?: number;
        h?: number;
    }): void;
}
//# sourceMappingURL=button.d.ts.map