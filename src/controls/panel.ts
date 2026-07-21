import Layout from '../core/layout.js';
import UIElement from '../core/UIelement.js';
import { DefaultTheme, PanelStyle } from '../themes/Theme.js';
import Phaser from 'phaser';

export interface PanelOptions {
  x?: number;
  y?: number;

  width?: number;
  height?: number;
  autoSize?: boolean;

  style?: PanelStyle;
}

export default class Panel extends UIElement {
  private readonly _graphics: Phaser.GameObjects.Graphics;
  private _layout: Layout | null = null;
  private _style: PanelStyle;
  private _autoSize: boolean;
  private _contentPadding = 0;
  private _backgroundDirty = true;

  constructor(scene: Phaser.Scene, options: PanelOptions) {
    super(scene, options.x ?? 0, options.y ?? 0);

    this._graphics = new Phaser.GameObjects.Graphics(scene);
    this.add(this._graphics);

    this._style = options.style ?? DefaultTheme.panel;

    super.setSize(options.width ?? 0, options.height ?? 0);
    this._autoSize = options.autoSize ?? true;
  }

  public setLayout(layout: Layout): this {
    this.detachLayout();

    this._layout = layout;
    this.add(layout);

    this.invalidateLayout();
    return this;
  }

  public removeLayout(): this {
    this.detachLayout();

    this.invalidateLayout();
    return this;
  }

  private detachLayout(): void {
    if (!this._layout) return;
    this.remove(this._layout);
    this._layout = null;
  }

  protected override layout() {
    if (this._layout) {
      const size = this._layout.getSize();

      if (this._autoSize) {
        const width = size.w + this._contentPadding;
        const height = size.h + this._contentPadding;

        if (width !== this.width || height !== this.height) {
          this.setMeasuredSize(width, height);
        }
      }

      this.updateLayoutPosition(size);
    }

    if (this._backgroundDirty) {
      this.drawBackground();
      this._backgroundDirty = false;
    }
  }

  private drawBackground() {
    console.log('draw', this.width, this.height);
    this._graphics.clear();

    this._graphics.fillStyle(this._style.background, this._style.alpha);

    this._graphics.lineStyle(this._style.borderWidth, this._style.border, this._style.alpha);

    this._graphics.fillRoundedRect(-this.width / 2, -this.height / 2, this.width, this.height, this._style.radius);

    this._graphics.strokeRoundedRect(-this.width / 2, -this.height / 2, this.width, this.height, this._style.radius);
  }
  public override setMeasuredSize(width: number, height: number) {
    if (width !== this.width || height !== this.height) {
      this._backgroundDirty = true;
    }

    super.setMeasuredSize(width, height);
  }

  public override setSize(width: number, height: number): this {
    super.setSize(width, height);

    this._backgroundDirty = true;
    this.invalidateLayout();
    this._autoSize = false;
    return this;
  }
  private updateLayoutPosition(size: { w: number; h: number }) {
    this._layout!.setPosition(-this.width / 2 + this._contentPadding / 2, -this.height / 2 + this._contentPadding / 2);
    console.log('panel', this.width, this.height, 'layout', this._layout?.x, this._layout?.y);
  }

  public addChild(child: UIElement): this {
    this.getLayout().addChild(child);

    this.invalidateLayout();
    return this;
  }

  public removeChild(child: UIElement): this {
    this.getLayout().removeChild(child);
    this.invalidateLayout();
    return this;
  }

  public clearChildren(): this {
    this.getLayout().clearChildren();
    this.invalidateLayout();
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
    return this._layout !== null;
  }

  public setStyle(panel: PanelStyle): this {
    this._style = panel;

    this._backgroundDirty = true;
    this.invalidateLayout();
    return this;
  }

  public getDirty(): boolean {
    return this._dirty;
  }

  public setAutoSize(enabled: boolean, padding = 0): this {
    if (this._autoSize === enabled && this._contentPadding === padding) {
      return this;
    }

    this._autoSize = enabled;
    this._contentPadding = padding;

    this.invalidateLayout();

    return this;
  }
}
