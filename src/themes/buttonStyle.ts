import { LabelStyle, labelStyleBase, PanelStyle, panelStyleBase } from './Theme.ts';

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

export function createButtonStyle(colors: { normal: number; hover: number; pressed: number }): ButtonStyle {
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
