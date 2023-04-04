import { disableSubmitButton, enableSubmitButton } from "./utils.js";
import { selectors } from "./constants.js";

export class FormValidator {
    constructor(formElement) {
        this._form = formElement;
        this._inputSelector = selectors.inputSelector;
        this._submitButtonSelector = selectors.submitButtonSelector;
        this._inactiveButtonClass = selectors.inactiveButtonClass;
        this._inputErrorClass = selectors.inputErrorClass;
        this._inputList = Array.from(
            formElement.querySelectorAll(this._inputSelector)
        );
        this._errorTextClass = selectors.errorTextClass;
        this._buttonElement = formElement.querySelector(
            this._submitButtonSelector
        );
    }

    /*---навешивание обработчиков на формы---*/
    enableValidation() {
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }

    /*--------навешивание валидации на поля-----------*/
    _setEventListeners() {
        disableSubmitButton(this._buttonElement);
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
            inputElement.addEventListener("focusout", (event) => {
                this._checkInputValidity(inputElement);
            });
        });
    }

    /*--------проверка условий валидации-----------*/
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            //если содержимое невалидно
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    /*--------доступность кнопки-----------*/
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._disableSubmitButton();
        } else {
            this._enableSubmitButton();
        }
    }

    /*--------поверка валидации обоих полей в форме-----------*/
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    /*--------показ ошибок валидации-----------*/
    _showInputError(inputElement) {
        this._errorElement = this._form.querySelector(
            `.${inputElement.id}-error`
        ); //находим нужный спан
        inputElement.classList.add(this._inputErrorClass); //добавляем нужный инпут при ошибке (красную подсветку)
        this._errorElement.classList.add(this._errorTextClass); //стилизуем спан
        this._errorElement.textContent = inputElement.validationMessage;
    }

    /*--------скрытие ошибок валидации-----------*/
    _hideInputError(inputElement) {
        this._errorElement = this._form.querySelector(
            `.${inputElement.id}-error`
        ); //находим нужный спан
        inputElement.classList.remove(this._inputErrorClass); // удаляем класс ошибки (красную подсветку)
        this._errorElement.classList.remove(this._errorTextClass); //удаляем видимость спана ошибки
        this._errorElement.textContent = ""; //очищаем спан
    }

    _disableSubmitButton() {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.setAttribute("disabled", "disabled");
    }

    _enableSubmitButton() {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.removeAttribute("disabled", "disabled");
    }
}
