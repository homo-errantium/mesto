class FormValidator {
    constructor(formElement, selectors) {
        this._formSelector = selectors.formSelector;
        this._inputSelector = selectors.inputSelector;
        this._submitButtonSelector = selectors.submitButtonSelector;
        this._inactiveButtonClass = selectors.inactiveButtonClass;
        this._inputErrorClass = selectors.inputErrorClass;
        this._inputList = Array.from(
            formElement.querySelectorAll(this._inputSelector)
        );
        this._formList = Array.from(
            document.querySelectorAll(this._formSelector)
        );
        this._fieldsetList = Array.from(
            formElement.querySelectorAll(this._fieldSelector)
        );
        this._errorTextClass = selectors.errorTextClass;
        this._fieldSelector = selectors.fieldSelector;
        this._popupCloseClass = selectors.popupCloseClass;
        this._buttonElement = formElement.querySelector(
            this._submitButtonSelector
        );
    }
    /*--------навешивание обработчиков на формы-----------*/
    enableValidation() {
        this._formList.forEach((formElement) => {
            formElement.addEventListener("submit", function (evt) {
                evt.preventDefault();
            });
            this._fieldsetList.forEach((fieldSet) => {
                this._setEventListeners();
            });
        });
    }

    /*--------навешивание валидации на поля-----------*/
    _setEventListeners() {
        _disableSubmitButton();
        this._inputList.forEach((inputElement) => {
            this._inputElement.addEventListener("input", () => {
                _checkInputValidity(inputElement);
                _toggleButtonState();
            });
            this._inputElement.addEventListener("focusout", (event) => {
                _checkInputValidity(inputElement);
            });
        });
    }

    /*--------проверка условий валидации-----------*/
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            //если содержимое невалидно
            this._showInputError(
                formElement,
                inputElement,
                inputElement.validationMessage
            );
        } else {
            this._hideInputError(formElement, inputElement);
        }
    }

    /*--------доступность кнопки-----------*/
    _toggleButtonState() {
        if (hasInvalidInput(inputList)) {
            this._disableSubmitButton(this._buttonElement);
        } else {
            this._enableSubmitButton(buttonElement);
        }
    }

    /*--------показ ошибок валидации-----------*/
    _showInputError(inputElement) {
        this._errorElement = this._formElement.querySelector(
            `.${inputElement.id}-error`
        ); //находим нужный спан
        inputElement.classList.add(this._inputErrorClass); //добавляем нужный инпут при ошибке (красную подсветку)
        this._errorElement.classList.add(this._errorTextClass); //стилизуем спан
        this._errorElement.textContent = errorMessage; // помещаем в спан стандартный текст ошибки
    }

    /*--------скрытие ошибок валидации-----------*/
    _hideInputError(inputElement) {
        this._errorElement = this._formElement.querySelector(
            `.${inputElement.id}-error`
        ); //находим нужный спан
        this._inputElement.classList.remove(selectors.inputErrorClass); // удаляем класс ошибки (красную подсветку)
        this._errorElement.classList.remove(selectors.errorTextClass); //удаляем видимость спана ошибки
        this._errorElement.textContent = ""; //очищаем спан
    }

    /*--------поверка валидации обоих полей в форме-----------*/
    _hasInvalidInput(inputList) {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
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
