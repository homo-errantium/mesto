import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._form = this._popupElement.querySelector(".popup__form");
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = this._popupElement.querySelectorAll(".popup__input");
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.id] = input.value;
        });
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValue());
        });
    }

    setInputValue(data) {
        this._inputList.forEach((item) => {
            item.value = data[item.name];
        });
    }

    closePopup() {
        super.closePopup();
        this._form.reset();
    }
}
