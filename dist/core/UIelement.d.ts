import Phaser from 'phaser';
export interface ILayoutNode {
    invalidateLayout(): void;
    validateLayout(): void;
}
export declare function isLayoutNode(obj: unknown): obj is ILayoutNode;
export default abstract class UIElement extends Phaser.GameObjects.Container implements ILayoutNode {
    protected _dirty: boolean;
    protected _enabled: boolean;
    constructor(scene: Phaser.Scene, x?: number, y?: number);
    invalidateLayout(): void;
    validateLayout(): void;
    protected abstract layout(): void;
    setEnabled(enabled: boolean): this;
    protected updateHitArea(): void;
    isEnabled(): boolean;
    getSize(): {
        w: number;
        h: number;
    };
    protected setMeasuredSize(width: number, height: number): void;
    setVisible(value: boolean): this;
    protected onSizeChanged(): void;
}
//# sourceMappingURL=UIelement.d.ts.map