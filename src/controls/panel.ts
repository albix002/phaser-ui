import Layout from '../core/layout.js';
import UIElement from '../core/UIelement.js';
import { DefaultTheme, PanelStyle } from '../themes/Theme.js';
import Phaser from 'phaser';

export interface PanelOptions {
  x?: number;
  y?: number;

  width: number;
  height: number;

  style?: PanelStyle;
}

export default class Panel extends UIElement {
  private readonly _graphics: Phaser.GameObjects.Graphics;
  private _layout?: Layout | undefined;
  private _style: PanelStyle;

  constructor(scene: Phaser.Scene, options: PanelOptions) {
    super(scene, options.x ?? 0, options.y ?? 0);

    this._graphics = scene.add.graphics();
    this.add(this._graphics);

    this._style = options.style ?? DefaultTheme.panel;

    this.setSize(options.width, options.height);

    this.validate();
  }

  public setLayout(layout: Layout): this {
    this.detachLayout();

    this._layout = layout;
    this.add(layout);

    this.invalidate();
    return this;
  }

  public removeLayout(): this {
    this.detachLayout();

    this.invalidate();
    return this;
  }

  private detachLayout(): void {
    if (!this._layout) return;
    this.remove(this._layout);
    this._layout = undefined;
  }

  protected override layout(): void {
    this._graphics.clear();
    this._graphics.fillStyle(this._style.background, this._style.alpha);
    this._graphics.lineStyle(this._style.borderWidth, this._style.border, this._style.alpha);
    this._graphics.fillRoundedRect(-this.width / 2, -this.height / 2, this.width, this.height, this._style.radius);
    this._graphics.strokeRoundedRect(-this.width / 2, -this.height / 2, this.width, this.height, this._style.radius);

    if (this._layout) {
      this._layout.validate();
      this._layout.setY(-this._layout.height / 2);
    }
  }

  public override setSize(width: number, height: number): this {
    super.setSize(width, height);

    this.invalidate();

    return this;
  }

  public addChild(child: UIElement): this {
    this.getLayout().addChild(child);
    // this.invalidate();
    return this;
  }

  public removeChild(child: UIElement): this {
    this.getLayout().removeChild(child);
    // this.invalidate();
    return this;
  }

  public clearChildren(): this {
    this.getLayout().clearChildren();
    // this.invalidate();
    return this;
  }

  private getLayout(): Layout {
    if (!this._layout) {
      throw new Error('Panel has no layout.');
    }
    return this._layout;
  }

  public getChildren(): Phaser.GameObjects.GameObject[] {
    return this.getLayout().getChildren();
  }

  public getChildCount(): number {
    return this.getLayout().getChildCount();
  }

  public hasChildren(): boolean {
    return this.getLayout().hasChildren();
  }

  public hasLayout(): boolean {
    return this._layout !== undefined;
  }

  public setStyle(panel: PanelStyle) {
    this._style = panel;
    this.invalidate();
  }

  private getLayoutSize(): { w: number; h: number } {
    return this.getLayout().getSize();
  }

  public setNormalizedSize(padding: number): this {
    this.setSize(this.getLayoutSize().w + padding, this.getLayoutSize().h + padding);

    return this;
  }
}
