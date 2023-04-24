import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit, selectors }) {
        super(popupSelector);
        this._form = this._popupElement.querySelector(selectors.formSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = this._popupElement.querySelectorAll(
            selectors.inputSelector
        );
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputList.forEach((input) => {
            this._inputValues[input.name] = input.value;
        });
        console.log(this._inputValues);
        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

    closePopup() {
        super.closePopup();
        this._form.reset();
    }
}
