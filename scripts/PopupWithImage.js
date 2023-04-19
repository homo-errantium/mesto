import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._image = this._popup.querySelector(".places__image");
        this._title = this._popup.querySelector(".popup__subtitle");
    }
    open(title, src) {
        this._image.src = src;
        this._image.alt = title;
        this._title.textContent = title;
        super.open();
    }
}
