import Layout, { HorizontalAlignment } from '../core/layout.js';
import Phaser from 'phaser';
interface VBoxOptions {
    x?: number;
    y?: number;
    alignment?: HorizontalAlignment;
    padding?: number;
    spacing?: number;
}
export default class Vbox extends Layout {
    protected _spacing: number;
    protected _padding: number;
    private _alignment;
    constructor(scene: Phaser.Scene, options: VBoxOptions);
    protected layout(): void;
}
export {};
//# sourceMappingURL=Vbox.d.ts.map