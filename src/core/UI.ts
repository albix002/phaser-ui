import Phaser from 'phaser';
import UIElement, { ILayoutNode } from './UIelement.js';

/**
 * Root container of the UI system.
 *
 * Responsible for validating UI elements every frame.
 */
export default class UI extends Phaser.GameObjects.Container implements ILayoutNode {
  private _dirty = true;
  constructor(scene: Phaser.Scene) {
    super(scene);

    scene.add.existing(this);
    this.addToUpdateList();
  }

  public validateLayout() {
    if (!this._dirty) return;

    this.validateChildren();
    this._dirty = false;
  }

  public preUpdate(): void {
    this.validateLayout();
  }

  public invalidateLayout(): void {
    if (this._dirty) return;
    this._dirty = true;
  }

  private validateChildren(): void {
    for (const child of this.list) {
      if (child instanceof UIElement) child.validateLayout();
    }
  }

  public getMaxWidth(elements: UIElement[]): number {
    let maxWidth = 0;

    for (const element of elements) {
      element.validateLayout();
      maxWidth = Math.max(maxWidth, element.width);
    }

    return maxWidth;
  }

  /**
   * @internal
   * Used only for debugging and testing.
   */
  public getDirty(): boolean {
    return this._dirty;
  }
}
