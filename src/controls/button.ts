import UIElement from '../core/UIelement';
import Phaser from 'phaser';
import Panel from './panel';
import Label from './label';
import { ButtonStyle, ButtonVariant, ButtonVisualStyle, DefaultTheme } from '../themes/Theme';

export enum ButtonState {
  Normal,
  Hover,
  Pressed,
  Disabled,
}

export interface ButtonOptions {
  x?: number;
  y?: number;

  text?: string;
  variant?: ButtonVariant;
  style?: ButtonStyle;
}

export default class Button extends UIElement {
  private _buttonState: ButtonState = ButtonState.Normal;
  private readonly _panel: Panel;
  private readonly _label: Label;
  private readonly _style: ButtonStyle;
  private _variant: ButtonVariant | 'red';
  private readonly _clickListeners: (() => void)[] = [];

  private _widthExplicit = 0;
  private _heightExplicit = 0;

  constructor(scene: Phaser.Scene, options: ButtonOptions) {
    super(scene, options.x ?? 0, options.y ?? 0);
    this._panel = new Panel(scene, {
      height: 0,
      width: 0,
    });
    this._label = new Label(scene, {
      text: options.text ?? '',
    });
    this._variant = options.variant ?? 'red';
    this._style = options.style ?? DefaultTheme.button[this._variant];

    this.add([this._panel, this._label]);

    this.on('pointerdown', () => {
      if (!this.isEnabled()) return;
      this.changeState(ButtonState.Pressed);
    });
    this.on('pointerup', () => {
      if (!this.isEnabled()) return;
      if (this._buttonState === ButtonState.Pressed) this.fireClick();
      this.changeState(ButtonState.Hover);
    });
    this.on('pointerover', () => {
      if (!this.isEnabled()) return;
      if (this._buttonState === ButtonState.Pressed) this.changeState(ButtonState.Pressed);
      else this.changeState(ButtonState.Hover);
    });
    this.on('pointerout', () => {
      if (!this.isEnabled()) return;
      this.changeState(ButtonState.Normal);
    });
    this.on('pointerupoutside', () => {
      if (!this.isEnabled()) return;

      this.changeState(ButtonState.Normal);
    });

    this.applyCurrentStyle();
  }

  public override setEnabled(enabled: boolean): this {
    super.setEnabled(enabled);
    if (enabled) this.changeState(ButtonState.Normal);
    else this.changeState(ButtonState.Disabled);
    return this;
  }

  private fireClick(): void {
    if (!this.isEnabled()) return;
    for (const cb of this._clickListeners) {
      cb();
    }
  }

  protected override layout(): void {
    this._label.validate();

    const padding = this._style.padding * 2;

    const width = this._widthExplicit == 0 ? this._label.width + padding : this._widthExplicit;
    const height = this._heightExplicit == 0 ? this._label.height + padding : this._heightExplicit;
    this._panel.setSize(width, height);

    this._panel.validate();

    this.setSize(width, height);

    this.updateHitArea();
  }

  public setText(text: string): this {
    if (this._label.getText() === text) return this;
    this._widthExplicit = 0;
    this._heightExplicit = 0;
    this._label.setText(text);
    this.invalidate();

    return this;
  }
  public onClick(callback: () => void): this {
    this._clickListeners.push(callback);

    return this;
  }
  public setStyle(style: ButtonVisualStyle): void {
    this._label.setStyle(style.label);
    this._panel.setStyle(style.panel);
    this._label.validate();
    this._panel.validate();

    this.invalidate();
  }

  private changeState(state: ButtonState): void {
    if (this._buttonState === state) return;
    this._buttonState = state;
    this.applyCurrentStyle();
  }

  private applyCurrentStyle(): void {
    this.scene.tweens.killTweensOf(this);

    switch (this._buttonState) {
      case ButtonState.Disabled:
        this.setStyle(this._style.disabled);
        break;
      case ButtonState.Hover:
        this.setStyle(this._style.hover);
        this.scene.tweens.add({
          targets: this,
          scaleX: 1.05,
          scaleY: 1.05,
          duration: 100,
        });
        break;
      case ButtonState.Normal:
        this.setStyle(this._style.normal);
        this.scene.tweens.add({
          targets: this,
          scaleX: 1,
          scaleY: 1,
          duration: 100,
        });
        break;
      case ButtonState.Pressed:
        this.setStyle(this._style.pressed);
        this.scene.tweens.add({
          targets: this,
          scaleX: 0.95,
          scaleY: 0.95,
          duration: 50,
        });
        break;
    }
  }

  public getText(): string {
    return this._label.getText();
  }

  public updateSize(config: { w?: number; h?: number }) {
    this._widthExplicit = config.w ?? this.width;
    this._heightExplicit = config.h ?? this.height;

    this.invalidate();
  }
}
