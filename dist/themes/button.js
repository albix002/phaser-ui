import { labelStyleBase, panelStyleBase } from './Theme.js';
export function createButtonStyle(colors, padding, borderWidth) {
    return {
        padding: padding ?? 10,
        normal: {
            label: labelStyleBase,
            panel: { ...panelStyleBase, background: colors.normal, borderWidth: borderWidth ?? panelStyleBase.borderWidth },
        },
        hover: {
            label: labelStyleBase,
            panel: { ...panelStyleBase, background: colors.hover, borderWidth: borderWidth ?? panelStyleBase.borderWidth },
        },
        pressed: {
            label: labelStyleBase,
            panel: { ...panelStyleBase, background: colors.pressed, borderWidth: borderWidth ?? panelStyleBase.borderWidth },
        },
        disabled: {
            label: labelStyleBase,
            panel: {
                ...panelStyleBase,
                alpha: 0.4,
                background: colors.normal,
            },
        },
    };
}
//# sourceMappingURL=button.js.map