class FormValidator {
    constructor(formElement, selectors) {
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

    /*--------навешивание обработчиков на формы-----------*/
    enableValidation() {
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }

    /*--------навешивание валидации на поля-----------*/
    _setEventListeners() {
        this._disableSubmitBtn();
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

    /*--------отключение кнопки-сабмита-----------*/
    _disableSubmitBtn() {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.setAttribute("disabled", "disabled");
    }

    _enableSubmitBtn() {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.removeAttribute("disabled", "disabled");
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
            this._disableSubmitBtn();
        } else {
            this._enableSubmitBtn();
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

    /*--------ф-я очитски валидации------*/
    _cleanErrorInput(currentPopup) {
        this._cleanErrorTextList = Array.from(
            currentPopup.querySelectorAll(".popup__input-error-text")
        );
        this._cleanErrorTextList.forEach((cleanErrorItem) => {
            cleanErrorItem.classList.remove("popup__input-error-text"); //удаляем видимость спана ошибки
            cleanErrorItem.textContent = ""; //очищаем спан
        });

        this._cleanErrorInputList = Array.from(
            currentPopup.querySelectorAll(".popup__input_type_error")
        );
        this._cleanErrorInputList.forEach((cleanErrorItem) => {
            cleanErrorItem.classList.remove("popup__input_type_error"); //удаляем видимость красной линии инпута
        });
    }
}
