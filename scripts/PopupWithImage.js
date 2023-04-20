import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popupElement.querySelector(".popup__viewe-image");
        this._title = this._popupElement.querySelector(
            ".popup__open-image-title"
        );
    }
    open(title, image) {
        this._image.src = image;
        this._image.alt = title;
        this._title.textContent = title;
        super.openPopup();
    }
}
