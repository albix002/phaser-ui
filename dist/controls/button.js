import UIElement from '../core/UIelement.js';
import Label from './label.js';
import { DefaultTheme, merge } from '../themes/Theme.js';
import Shape from './shape.js';
export var ButtonState;
(function (ButtonState) {
    ButtonState[ButtonState["Normal"] = 0] = "Normal";
    ButtonState[ButtonState["Hover"] = 1] = "Hover";
    ButtonState[ButtonState["Pressed"] = 2] = "Pressed";
    ButtonState[ButtonState["Disabled"] = 3] = "Disabled";
})(ButtonState || (ButtonState = {}));
export default class Button extends UIElement {
    _buttonState = ButtonState.Normal;
    _background;
    _label;
    _style;
    _variant;
    _clickListeners = [];
    _widthExplicit = null;
    _heightExplicit = null;
    constructor(scene, options) {
        super(scene, options.x ?? 0, options.y ?? 0);
        this._variant = options.variant ?? 'red';
        const base = DefaultTheme.button[this._variant];
        this._style = merge(base, options.style);
        this._background = new Shape(scene, this._style.normal.panel);
        this._label = new Label(scene, {
            text: options.text ?? '',
        });
        this.add([this._background, this._label]);
        this.on('pointerdown', () => {
            if (!this.isEnabled())
                return;
            this.changeState(ButtonState.Pressed);
        });
        this.on('pointerup', () => {
            if (!this.isEnabled())
                return;
            if (this._buttonState === ButtonState.Pressed)
                this.fireClick();
            this.changeState(ButtonState.Hover);
        });
        this.on('pointerover', () => {
            if (!this.isEnabled())
                return;
            if (this._buttonState === ButtonState.Pressed)
                this.changeState(ButtonState.Pressed);
            else
                this.changeState(ButtonState.Hover);
        });
        this.on('pointerout', () => {
            if (!this.isEnabled())
                return;
            this.changeState(ButtonState.Normal);
        });
        this.on('pointerupoutside', () => {
            if (!this.isEnabled())
                return;
            this.changeState(ButtonState.Normal);
        });
        this.applyCurrentStyle();
    }
    setEnabled(enabled) {
        super.setEnabled(enabled);
        if (enabled)
            this.changeState(ButtonState.Normal);
        else
            this.changeState(ButtonState.Disabled);
        return this;
    }
    fireClick() {
        if (!this.isEnabled())
            return;
        for (const cb of this._clickListeners) {
            cb();
        }
    }
    layout() {
        this._label.validateLayout();
        const padding = this._style.padding * 2;
        const width = this._widthExplicit ?? this._label.width + padding;
        console.log(this.getText(), {
            explicit: this._widthExplicit,
            label: this._label.width,
            final: width,
        });
        const height = this._heightExplicit ?? this._label.height + padding;
        this._background.setMeasuredSize(width, height);
        this._background.validateLayout();
        this._label.setPosition(0, 0);
        this.setMeasuredSize(width, height);
        this.updateHitArea();
    }
    setText(text) {
        if (this._label.getText() === text)
            return this;
        this._widthExplicit = 0;
        this._heightExplicit = 0;
        this._label.setText(text);
        this.invalidateLayout();
        return this;
    }
    onClick(callback) {
        this._clickListeners.push(callback);
        return this;
    }
    setStyle(style) {
        this._label.setStyle(style.label);
        this._background.setStyle(style.panel);
        this.invalidateLayout();
    }
    changeState(state) {
        if (this._buttonState === state)
            return;
        this._buttonState = state;
        this.applyCurrentStyle();
    }
    applyCurrentStyle() {
        this.scene.tweens.killTweensOf(this);
        switch (this._buttonState) {
            case ButtonState.Disabled:
                this.setStyle(this._style.disabled);
                break;
            case ButtonState.Hover:
                this.setStyle(this._style.hover);
                this.scene.tweens.add({
                    targets: this,
                    scaleX: 1.05,
                    scaleY: 1.05,
                    duration: 100,
                });
                break;
            case ButtonState.Normal:
                this.setStyle(this._style.normal);
                this.scene.tweens.add({
                    targets: this,
                    scaleX: 1,
                    scaleY: 1,
                    duration: 100,
                });
                break;
            case ButtonState.Pressed:
                this.setStyle(this._style.pressed);
                this.scene.tweens.add({
                    targets: this,
                    scaleX: 0.95,
                    scaleY: 0.95,
                    duration: 50,
                });
                break;
        }
    }
    getText() {
        return this._label.getText();
    }
    updateSize(config) {
        this._widthExplicit = config.w ?? this.width;
        this._heightExplicit = config.h ?? this.height;
        this.invalidateLayout();
    }
}
//# sourceMappingURL=button.js.map