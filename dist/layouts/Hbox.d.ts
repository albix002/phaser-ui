import Layout, { VerticalAlignment } from '../core/layout.js';
interface HboxOptions {
    x?: number;
    y?: number;
    alignment?: VerticalAlignment;
    padding?: number;
    spacing?: number;
}
export default class Hbox extends Layout {
    protected _padding: number;
    protected _spacing: number;
    private _alignment;
    constructor(scene: Phaser.Scene, options: HboxOptions);
    protected layout(): void;
}
export {};
//# sourceMappingURL=Hbox.d.ts.map