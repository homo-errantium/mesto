/*--------показ ошибок валидации-----------*/
function showInputError(formElement, inputElement, errorMessage, selectors) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); //находим нужный спан
    inputElement.classList.add(selectors.inputErrorClass); //добавляем нужный инпут при ошибке (красную подсветку)
    errorElement.textContent = errorMessage; // помещаем в спан стандартный текст ошибки
    errorElement.classList.add(selectors.errorTextClass); //стилизуем спан
}

/*--------скрытие ошибок валидации-----------*/
function hideInputError(formElement, inputElement, selectors) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); //находим нужный спан
    inputElement.classList.remove(selectors.inputErrorClass); // удаляем класс ошибки (красную подсветку)
    errorElement.classList.remove(selectors.errorTextClass); //удаляем видимость спана ошибки
    errorElement.textContent = ""; //очищаем спан
}

/*--------проверка условий валидации-----------*/
function checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
        //если содержимое невалидно
        showInputError(
            formElement,
            inputElement,
            inputElement.validationMessage,
            selectors
        );
    } else {
        hideInputError(formElement, inputElement, selectors);
    }
}

/*--------навешивание валидации на поля-----------*/
function setEventListeners(formElement, selectors) {
    const inputList = Array.from(
        formElement.querySelectorAll(selectors.inputSelector)
    ); //массив инпутов одной формы
    const buttonElement = formElement.querySelector(
        selectors.submitButtonSelector
    ); //кнопка формы
    disableSubmitButton(buttonElement, selectors);
    //навешиваем слушатель на каждый из инпутов в процессе заполнения
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            checkInputValidity(formElement, inputElement);
            // чтобы проверять его при изменении любого из полей
            toggleButtonState(inputList, buttonElement, selectors);
        });
        //навешиваем слушатель на каждый из инпутов при переходе
        inputElement.addEventListener("focusout", (event) => {
            checkInputValidity(formElement, inputElement);
        });
    });
}

/*--------навешивание валидации на формы-----------*/
function enableValidation(selectors) {
    const formList = Array.from(
        document.querySelectorAll(selectors.formSelector)
    ); //массив форм
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", function (evt) {
            evt.preventDefault();
        });
        const fieldsetList = Array.from(
            formElement.querySelectorAll(selectors.fieldSelector)
        );
        fieldsetList.forEach((fieldSet) => {
            setEventListeners(fieldSet, selectors);
        });
    });
}

/*--------поверка валидации обоих полей в форме-----------*/
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

/*--------доступность кнопки-----------*/
function toggleButtonState(inputList, buttonElement, selectors) {
    if (hasInvalidInput(inputList)) {
        disableSubmitButton(buttonElement, selectors);
    } else {
        enableSubmitButton(buttonElement, selectors);
    }
}

/*--------отключение кнопки-сабмита-----------*/
function disableSubmitButton(buttonElement, selectors) {
    buttonElement.classList.add(selectors.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
}

function enableSubmitButton(buttonElement, selectors) {
    buttonElement.classList.remove(selectors.inactiveButtonClass);
    buttonElement.removeAttribute("disabled", "disabled");
}

/*--------ф-я очитски валидации------*/
function cleanErrorInput(currentPopup) {
    const cleanErrorTextList = Array.from(
        currentPopup.querySelectorAll(".popup__input-error-text")
    );
    cleanErrorTextList.forEach((cleanErrorItem) => {
        cleanErrorItem.classList.remove("popup__input-error-text"); //удаляем видимость спана ошибки
        cleanErrorItem.textContent = ""; //очищаем спан
    });

    const cleanErrorInputList = Array.from(
        currentPopup.querySelectorAll(".popup__input_type_error")
    );
    cleanErrorInputList.forEach((cleanErrorItem) => {
        cleanErrorItem.classList.remove("popup__input_type_error"); //удаляем видимость красной линии инпута
    });
}
