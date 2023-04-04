import {
    selectors,
    nameInputEdit,
    jobInputEdit,
    userNameProfileEdit,
    userInfoProfileEdit,
} from "./constants.js";

function openPopup(popup) {
    document.addEventListener("keydown", handleEscapeButton);
    popup.classList.add("popup_opened");
}

/*--------ф-я закрытия по клавише------*/
function handleEscapeButton(event) {
    if (event.key === "Escape") {
        const currentPopupItem = document.querySelector(".popup_opened");
        closePopup(currentPopupItem);
    }
}

/*--------ф-я закрытия при клике на оверлей------*/
function closePopupOverlay(selectors) {
    const popupList = Array.from(document.querySelectorAll(".popup"));
    popupList.forEach((popupElement) => {
        popupElement.addEventListener("mousedown", (evt) => {
            if (evt.target.classList.contains("popup_opened")) {
                closePopup(popupElement);
            }
            if (evt.target.classList.contains("popup__close")) {
                closePopup(popupElement);
            }
        });
    });
}

/*--------ф-я открытия/закрытия попап-а------*/
function closePopup(popup) {
    document.removeEventListener("keydown", handleEscapeButton);
    popup.classList.remove("popup_opened");
}

function disableSubmitButton(buttonElement) {
    buttonElement.classList.add(selectors.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
}

function enableSubmitButton(buttonElement) {
    buttonElement.classList.remove(selectors.inactiveButtonClass);
    buttonElement.removeAttribute("disabled", "disabled");
}

/*--------ф-я дефолтного заполнения полей профайла------*/
function fillPopupProfileImage() {
    nameInputEdit.value = userNameProfileEdit.textContent; //добавления в ред.окно прежнего имени
    jobInputEdit.value = userInfoProfileEdit.textContent; //добавления в ред.окно прежнего статуса
}

/*-----обраб-к закрытия попапа------*/
function handleClosePopup() {
    const popupCloseButtonList = Array.from(
        document.querySelectorAll(".popup__close")
    );
    popupCloseButtonList.forEach((popupCloseButton) => {
        popupCloseButton.addEventListener("click", function (evt) {
            const popupCloseItem = popupCloseButton.closest(".popup");
            closePopup(popupCloseItem); //ф-я самого закрытия
        });
    });
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

export {
    openPopup,
    closePopup,
    closePopupOverlay,
    disableSubmitButton,
    enableSubmitButton,
    fillPopupProfileImage,
    handleClosePopup,
    cleanErrorInput,
};
