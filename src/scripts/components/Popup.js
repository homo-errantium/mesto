export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.closePopup();
        }
    }

    closePopup() {
        this._popupElement.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscClose);
    }

    openPopup() {
        this._popupElement.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleEscClose);
    }

    setEventListeners() {
        this._popupElement.addEventListener("mousedown", (evt) => {
            if (
                evt.target.classList.contains("popup_opened") ||
                evt.target.classList.contains("popup__close")
            ) {
                this.closePopup();
            }
        });
    }
}
