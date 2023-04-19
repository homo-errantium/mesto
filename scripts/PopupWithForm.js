import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popup, submitForm) {
        super(popup);
        this._submitForm = submitForm;
        this._form = this._popup.querySelector(".popup__form");
    }

    _getInputValues() {
        this._inputList = this._element.querySelectorAll(".popup__input");
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.id] = input.value;
        });
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._submitForm(this._getInputValue());
        });
    }

    setInputValue(data) {
        this._inputs.forEach((item) => {
            item.value = data[item.name];
        });
    }

    closePopup() {
        super.closePopup();
        this._form.reset();
    }
}
