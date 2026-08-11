import { labelStyleBase, panelStyleBase } from "./Theme.js";
export function createButtonStyle(colors) {
    return {
        padding: 10,
        borderWidth: 4,
        normal: {
            label: labelStyleBase,
            panel: {
                ...panelStyleBase,
                background: colors.normal,
            },
        },
        hover: {
            label: labelStyleBase,
            panel: {
                ...panelStyleBase,
                background: colors.hover,
            },
        },
        pressed: {
            label: labelStyleBase,
            panel: {
                ...panelStyleBase,
                background: colors.pressed,
            },
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
//# sourceMappingURL=buttonStyle.js.map