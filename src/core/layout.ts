import UIElement from './UIelement.js';
import Phaser from 'phaser';

export type HorizontalAlignment = 'left' | 'center' | 'right';
export type VerticalAlignment = 'top' | 'center' | 'bottom';

export interface ContentAlignment {
  horizontal: HorizontalAlignment;
  vertical: VerticalAlignment;
}

export interface BoxStyle {
  lineWidth?: number;
  color?: number;
  alpha?: number;
}

export interface LayoutOptions {
  alignment?: Partial<ContentAlignment>;
  enableDrawBox?: boolean;
  x?: number;
  y?: number;
  boxStyle?: BoxStyle;
  padding?: number;
  spacing?: number;
}

export default abstract class Layout extends UIElement {
  protected readonly _graphics: Phaser.GameObjects.Graphics;
  protected _alignment: ContentAlignment;
  protected _enableDrawBox: boolean;
  protected _boxStyle: BoxStyle;

  protected _spacing: number;
  protected _padding: number;
  constructor(scene: Phaser.Scene, options?: LayoutOptions) {
    super(scene, options?.x ?? 0, options?.y ?? 0);
    this._graphics = new Phaser.GameObjects.Graphics(scene);
    this.add(this._graphics);
    this._alignment = {
      horizontal: 'center',
      vertical: 'center',
      ...options?.alignment,
    };
    this._boxStyle = {
      lineWidth: 4,
      color: 0xffffff,
      alpha: 1,
      ...options?.boxStyle,
    };
    this._spacing = options?.spacing ?? 10;
    this._padding = options?.padding ?? 15;
    this._enableDrawBox = options?.enableDrawBox ?? false;
  }

  public setSpacing(value: number): this {
    if (this._spacing === value) return this;
    this._spacing = value;

    this.invalidateLayout();
    return this;
  }

  public setPadding(value: number): this {
    if (this._padding === value) return this;
    this._padding = value;

    this.invalidateLayout();
    return this;
  }

  public addChild(child: UIElement): this {
    super.add(child);

    this.invalidateLayout();

    return this;
  }

  public removeChild(child: UIElement): this {
    super.remove(child);

    this.invalidateLayout();
    return this;
  }

  public clearChildren(): this {
    super.removeAll();

    this.invalidateLayout();

    return this;
  }

  public getChildren(): Phaser.GameObjects.GameObject[] {
    return [...this.list];
  }
  public getChildCount(): number {
    return this.list.length;
  }
  public hasChildren(): boolean {
    return this.list.length > 0;
  }

  protected abstract override layout(): void;

  protected *visibleChildren(): Iterable<UIElement> {
    for (const child of this.list) {
      if (child instanceof UIElement && child.visible) {
        yield child;
      }
    }
  }

  /**
   * @deprecated
   *
   * Use addChild() method instead
   */
  public override add(child: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[]): this {
    super.add(child);

    return this;
  }

  protected drawBox() {
    this._graphics.lineStyle(this._boxStyle.lineWidth!, this._boxStyle.color!, this._boxStyle.alpha);
    this._graphics.strokeRect(0, 0, this.width, this.height);
  }

  protected setChildPosition(child: UIElement, centerX: number, centerY: number): void {
    if (child instanceof Layout) {
      child.setPosition(centerX - child.width / 2, centerY - child.height / 2);
    } else {
      child.setPosition(centerX, centerY);
    }
  }

  public setAlignment(alignment: Partial<ContentAlignment>) {
    this._alignment = {
      ...this._alignment,
      ...alignment,
    };
    return this;
  }

  public setBoxStyle(style: BoxStyle) {
    this._boxStyle = {
      ...this._boxStyle,
      ...style,
    };
    return this;
  }

  public set enableBox(val: boolean) {
    this._enableDrawBox = val;
  }
}
