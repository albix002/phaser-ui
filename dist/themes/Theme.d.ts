export type ButtonVariant = keyof typeof DefaultTheme.button;
export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
export declare function merge<T>(base: T, override?: DeepPartial<T>): T;
export declare function mergeInto(target: any, source: any): void;
export interface PanelStyle {
    background: number;
    alpha: number;
    border: number;
    borderWidth: number;
    radius: number;
    padding: number;
}
export interface LabelStyle {
    color: string;
    fontSize: number;
    fontFamily: string;
}
export interface ButtonVisualStyle {
    panel: PanelStyle;
    label: LabelStyle;
}
export interface ButtonStyle {
    padding: number;
    normal: ButtonVisualStyle;
    hover: ButtonVisualStyle;
    pressed: ButtonVisualStyle;
    disabled: ButtonVisualStyle;
}
export interface Theme {
    panel: PanelStyle;
    label: LabelStyle;
    button: {
        red: ButtonStyle;
        yellow: ButtonStyle;
        green: ButtonStyle;
        lightBlue: ButtonStyle;
        purple: ButtonStyle;
        orange: ButtonStyle;
    };
}
export declare const DefaultTheme: Theme;
//# sourceMappingURL=Theme.d.ts.map