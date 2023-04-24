import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector, selectors) {
        super(popupSelector);
        this._image = this._popupElement.querySelector(
            selectors.popupVieweImageSelector
        );
        this._title = this._popupElement.querySelector(
            selectors.popupOpenImageTitleSelector
        );
    }
    open(title, image) {
        this._image.src = image;
        this._image.alt = title;
        this._title.textContent = title;
        super.openPopup();
    }
}
