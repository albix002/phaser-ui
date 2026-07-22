import UIElement from '../core/UIelement.js';
import Phaser from 'phaser';
import { DefaultTheme } from '../themes/Theme.js';
export default class Label extends UIElement {
    _textObject;
    _style;
    constructor(scene, options) {
        super(scene, options.x ?? 0, options.y ?? 0);
        this._textObject = new Phaser.GameObjects.Text(scene, 0, 0, options.text, this.createTextStyle(options.style ?? DefaultTheme.label)).setOrigin(0.5);
        this.add(this._textObject);
        this._style = options.style ?? DefaultTheme.label;
    }
    getStyle() {
        return this._style;
    }
    layout() {
        this.setMeasuredSize(this._textObject.width, this._textObject.height);
        console.log('label', this.width, this.height, this.x, this.y);
    }
    setText(text) {
        if (this._textObject.text === text)
            return this;
        this._textObject.setText(text);
        this.invalidateLayout();
        return this;
    }
    getText() {
        return this._textObject.text;
    }
    createTextStyle(style) {
        return {
            color: style.color,
            fontSize: style.fontSize,
            fontFamily: style.fontFamily,
        };
    }
    setStyle(label) {
        if (this._style === label)
            return;
        this._style = label;
        this._textObject.setColor(label.color);
        this._textObject.setFontSize(label.fontSize);
        this._textObject.setFontFamily(label.fontFamily);
        this.invalidateLayout();
    }
}
//# sourceMappingURL=label.js.map