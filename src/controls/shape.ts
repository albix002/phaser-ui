import Phaser from 'phaser';
import UIElement from '../core/UIelement.js';
import { PanelStyle } from '../themes/Theme.js';

export default class Shape extends UIElement {
  private readonly _graphics: Phaser.GameObjects.Graphics;
  private _style: PanelStyle;
  private _dirtyGraphics = true;

  constructor(scene: Phaser.Scene, style: PanelStyle, x = 0, y = 0) {
    super(scene, x, y);

    this._graphics = scene.add.graphics();
    this.add(this._graphics);

    this._style = style;
  }

  protected override layout(): void {
    if (!this._dirtyGraphics) return;

    this.redraw();
    this._dirtyGraphics = false;
  }

  public setStyle(style: PanelStyle): this {
    this._style = style;
    this._dirtyGraphics = true;
    this.invalidateLayout();
    return this;
  }

  public override setMeasuredSize(width: number, height: number): this {
    super.setMeasuredSize(width, height);

    this._dirtyGraphics = true;

    return this;
  }

  private redraw(): void {
    this._graphics.clear();

    this._graphics.fillStyle(this._style.background);

    if (this._style.borderWidth > 0) {
      this._graphics.lineStyle(this._style.borderWidth, this._style.border);
    }

    this._graphics.fillRoundedRect(-this.width / 2, -this.height / 2, this.width, this.height, this._style.radius);

    if (this._style.borderWidth > 0) {
      this._graphics.strokeRoundedRect(-this.width / 2, -this.height / 2, this.width, this.height, this._style.radius);
    }
  }
}
