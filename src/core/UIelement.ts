import Phaser from 'phaser';

export default abstract class UIElement extends Phaser.GameObjects.Container {
  protected _dirty = true;
  protected _enabled = true;

  constructor(scene: Phaser.Scene, x = 0, y = 0) {
    super(scene, x, y);

    scene.add.existing(this);
  }

  protected invalidate(): void {
    this._dirty = true;
  }

  public validate(): void {
    if (!this._dirty) {
      return;
    }

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
    this.validate();
    return { w: this.width, h: this.height };
  }
}
