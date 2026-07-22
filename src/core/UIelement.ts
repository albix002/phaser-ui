import Phaser from 'phaser';

export interface ILayoutNode {
  invalidateLayout(): void;
  validateLayout(): void;
}

export function isLayoutNode(obj: unknown): obj is ILayoutNode {
  return obj != null && typeof (obj as any).invalidateLayout === 'function';
}

export default abstract class UIElement extends Phaser.GameObjects.Container implements ILayoutNode {
  protected _dirty = true;
  protected _enabled = true;

  constructor(scene: Phaser.Scene, x = 0, y = 0) {
    super(scene, x, y);

    scene.add.existing(this);
  }

  public invalidateLayout(): void {
    if (this._dirty) return;
    this._dirty = true;

    const parent = this.parentContainer;
    if (isLayoutNode(parent)) parent.invalidateLayout();
  }

  public validateLayout(): void {
    if (!this._dirty) return;

    this.layout();
    this._dirty = false;
  }

  protected abstract layout(): void;

  public setEnabled(enabled: boolean): this {
    if (this._enabled === enabled) return this;
    this._enabled = enabled;
    return this;
  }

  protected updateHitArea(): void {
    let rect = this.input?.hitArea as Phaser.Geom.Rectangle | undefined;

    if (!rect) {
      rect = new Phaser.Geom.Rectangle();
      this.setInteractive(rect, Phaser.Geom.Rectangle.Contains);
    }

    rect.setTo(0, 0, this.width, this.height);
  }

  public isEnabled(): boolean {
    return this._enabled;
  }

  public getSize(): { w: number; h: number } {
    this.validateLayout();
    return { w: this.width, h: this.height };
  }

 protected setMeasuredSize(width: number, height: number): void {
    if (width === this.width && height === this.height) return;

    super.setSize(width, height);

    this.onSizeChanged();
    this.invalidateLayout();

    const parent = this.parentContainer;
    if (isLayoutNode(parent)) {
        parent.invalidateLayout();
    }
  }

  public override setVisible(value: boolean): this {
    if (this.visible === value) {
        return this;
    }

    super.setVisible(value);

    const parent = this.parentContainer;
    if (isLayoutNode(parent)) {
        parent.invalidateLayout();
    }

    return this;
}
 protected onSizeChanged() {}

}
