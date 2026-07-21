import UIElement from '../core/UIelement.js';
import Phaser from 'phaser';
import { DefaultTheme, LabelStyle } from '../themes/Theme.js';

export interface LabelOptions {
  x?: number;
  y?: number;

  text: string;
  style?: LabelStyle;
}

export default class Label extends UIElement {
  private readonly _textObject: Phaser.GameObjects.Text;
  private _style: LabelStyle;
  constructor(scene: Phaser.Scene, options: LabelOptions) {
    super(scene, options.x ?? 0, options.y ?? 0);

    this._textObject = new Phaser.GameObjects.Text(
      scene,
      0,
      0,
      options.text,
      this.createTextStyle(options.style ?? DefaultTheme.label),
    ).setOrigin(0.5);
    this.add(this._textObject);

    this._style = options.style ?? DefaultTheme.label;
  }
  getStyle() {
    return this._style;
  }

  protected override layout(): void {
    this.setSize(this._textObject.width, this._textObject.height);
  }

  public setText(text: string): this {
    if (this._textObject.text === text) return this;
    this._textObject.setText(text);
    this.invalidate();
    return this;
  }

  public getText(): string {
    return this._textObject.text;
  }

  private createTextStyle(style: LabelStyle): Phaser.Types.GameObjects.Text.TextStyle {
    return {
      color: style.color,
      fontSize: style.fontSize,
      fontFamily: style.fontFamily,
    };
  }

  setStyle(label: LabelStyle) {
    this._style = label;
    this._textObject.setColor(label.color);
    this._textObject.setFontSize(label.fontSize);
    this._textObject.setFontFamily(label.fontFamily);
    this.invalidate();
  }
}
