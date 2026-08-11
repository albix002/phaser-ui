import { LabelStyle, PanelStyle } from './Theme.ts';
export interface ButtonStyle {
    padding: number;
    borderWidth: number;
    normal: ButtonVisualStyle;
    hover: ButtonVisualStyle;
    pressed: ButtonVisualStyle;
    disabled: ButtonVisualStyle;
}
export interface ButtonVisualStyle {
    panel: PanelStyle;
    label: LabelStyle;
}
export declare function createButtonStyle(colors: {
    normal: number;
    hover: number;
    pressed: number;
}): ButtonStyle;
//# sourceMappingURL=buttonStyle.d.ts.map