import Phaser from 'phaser';
import UIElement from '../core/UIelement.js';
import { DefaultTheme, merge, PanelStyle } from '../themes/Theme.js';

export default class Shape extends UIElement {
  private readonly _graphics: Phaser.GameObjects.Graphics;
  private _style: PanelStyle;
  private _dirtyGraphics = true;

  constructor(scene: Phaser.Scene, style: Partial<PanelStyle>, x = 0, y = 0) {
    super(scene, x, y);

    this._graphics = scene.add.graphics();
    this.add(this._graphics);

    this._style = merge(DefaultTheme.panel, style);
  }

  protected override layout(): void {
    if (!this._dirtyGraphics) return;

    this.redraw();
    this._dirtyGraphics = false;
  }

  public setStyle(style: Partial<PanelStyle>): this {
    this._style = merge(this._style, style);
    this._dirtyGraphics = true;
    this.invalidateLayout();
    return this;
  }

  protected override onSizeChanged(): void {
    this._dirtyGraphics = true;
  }
  public override setMeasuredSize(width: number, height: number): void {
    const changed = width !== this.width || height !== this.height;

    super.setMeasuredSize(width, height);

    if (changed) {
      this._dirtyGraphics = true;
    }
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
