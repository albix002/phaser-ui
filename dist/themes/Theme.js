function createButtonStyle(colors) {
    return {
        padding: 10,
        normal: {
            label: labelStyleBase,
            panel: { ...panelStyleBase, background: colors.normal },
        },
        hover: {
            label: labelStyleBase,
            panel: { ...panelStyleBase, background: colors.hover },
        },
        pressed: {
            label: labelStyleBase,
            panel: { ...panelStyleBase, background: colors.pressed },
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
export function merge(base, override) {
    if (!override) {
        return structuredClone(base);
    }
    const result = structuredClone(base);
    mergeInto(result, override);
    return result;
}
export function mergeInto(target, source) {
    for (const key in source) {
        const value = source[key];
        if (value &&
            typeof value === 'object' &&
            !Array.isArray(value)) {
            mergeInto(target[key], value);
        }
        else {
            target[key] = value;
        }
    }
}
const panelStyleBase = {
    alpha: 0.6,
    background: 0x222222,
    border: 0xffffff,
    borderWidth: 4,
    radius: 8,
    padding: 12,
};
const labelStyleBase = {
    color: '#ffffff',
    fontSize: 30,
    fontFamily: 'Pixeloid',
};
export const DefaultTheme = {
    panel: panelStyleBase,
    label: labelStyleBase,
    button: {
        orange: createButtonStyle({
            hover: 0xff9470,
            normal: 0xff8157,
            pressed: 0xff5b24,
        }),
        purple: createButtonStyle({
            hover: 0xac00e6,
            normal: 0x8600b3,
            pressed: 0x600080,
        }),
        lightBlue: createButtonStyle({
            hover: 0x7fa2c7,
            normal: 0x5c88b7,
            pressed: 0x3d628a,
        }),
        green: createButtonStyle({
            hover: 0x5cb75d,
            normal: 0x4caf50,
            pressed: 0x3d8a3f,
        }),
        red: createButtonStyle({
            hover: 0xe03724,
            normal: 0xa12517,
            pressed: 0x5d160e,
        }),
        yellow: createButtonStyle({
            hover: 0xffd147,
            normal: 0xffc414,
            pressed: 0xe0a800,
        }),
    },
};
//# sourceMappingURL=Theme.js.map