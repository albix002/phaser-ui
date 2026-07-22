import UIElement from './UIelement.js';
import Phaser from 'phaser';

export type HorizontalAlignment = 'left' | 'center' | 'right';
export type VerticalAlignment = 'top' | 'center' | 'bottom';


export interface ContentAlignment {
    horizontal: HorizontalAlignment;
    vertical: VerticalAlignment;
}

export default abstract class Layout extends UIElement {
  constructor(scene: Phaser.Scene, x = 0, y = 0) {
    super(scene, x, y);
  }
  protected _spacing = 0;
  protected _padding = 0;

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
}
