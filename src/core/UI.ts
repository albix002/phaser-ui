import Phaser from 'phaser';
import UIElement from './UIelement';

/**
 * Root container of the UI system.
 *
 * Responsible for validating UI elements every frame.
 */
export default class UI extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene);

    scene.add.existing(this);
    this.addToUpdateList();
  }

  public preUpdate(): void {
    this.validateChildren();
  }

  public validating() {
    this.validateChildren();
  }

  private validateChildren(): void {
    for (const child of this.list) {
      if (child instanceof UIElement) child.validate();
    }
  }

  public getMaxWidth(elements: UIElement[]): number {
    let maxWidth = 0;

    for (const element of elements) {
      element.validate();
      maxWidth = Math.max(maxWidth, element.width);
    }

    return maxWidth;
  }

  //   private validateChildren(container: Phaser.GameObjects.Container): void {
  //     for (const child of container.list) {
  //         if (child instanceof UIElement) {
  //             child.validate();
  //         }

  //         if (child instanceof Phaser.GameObjects.Container) {
  //             this.validateChildren(child);
  //         }
  //     }
  // }
}
