const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const popupForm = document.querySelector(".popup__form");
const popupOpen = document.querySelector(".popup_type_open-image");
const places = document.querySelector(".places");
const profile = document.querySelector(".profile");
const redactButton = profile.querySelector(".profile__redact-button");
const addButton = profile.querySelector(".profile__add-button");
const formPopupEdit = popupEdit.querySelector(".popup__form");
const formPopupAdd = popupAdd.querySelector(".popup__form");
const nameInputEdit = popupEdit.querySelector(".popup__input_type_username");
const nameInputAdd = popupAdd.querySelector(".popup__input_type_placename");
const jobInputEdit = popupEdit.querySelector(".popup__input_type_userinfo");
const linkInputAdd = popupAdd.querySelector(".popup__input_type_placelink");
const userNameProfileEdit = profile.querySelector(".profile__title");
const userInfoProfileEdit = profile.querySelector(".profile__subtitle");
const vieweImage = popupOpen.querySelector(".popup__viewe-image");
const imageTitle = popupOpen.querySelector(".popup__open-image-title");

/*------ф-я создание карточек---------*/
function creatCard(card) {
    const newCard = document
        .querySelector("#placesCardTemplate")
        .content.cloneNode(true);
    const newCardImage = newCard.querySelector(".places__image");
    newCardImage.setAttribute("src", card.link);
    newCardImage.setAttribute("alt", `фото: ${card.name}`);
    const newCardHeading = newCard.querySelector(".places__subtitle");
    newCardHeading.textContent = card.name;
    const likeButton = newCard.querySelector(".places__like-logo");
    likeButton.addEventListener("click", handleLikeButton);
    const deleteButton = newCard.querySelector(".places__delete-button");
    deleteButton.addEventListener("click", handleDeleteButton);
    newCardImage.addEventListener("click", handleCardOpen);
    return newCard;
}

/*-----ф-я удаления карточки------*/
function handleDeleteButton(event) {
    const deleteCardButton = event.target;
    const deleteCard = deleteCardButton.closest(".places__item");
    deleteCard.remove();
}

/*-----ф-я добавления карточек в блок-------*/
function addCard(card) {
    const newCardItem = creatCard(card);
    places.prepend(newCardItem);
}

/*-----ф-я создание каточек из массива-------*/
initialCards.forEach(addCard);

/*----ф-я лайк-----*/
function handleLikeButton(event) {
    const likeCardButton = event.target;
    likeCardButton.classList.toggle("places__like-logo_active");
}

/*--------обр-к открытие/закрытие попап-а------*/
function handleCardOpen(event) {
    const clickImage = event.target;
    vieweImage.setAttribute("src", clickImage.src);
    const clickImageItem = clickImage.closest(".places__item");
    const textImage =
        clickImageItem.querySelector(".places__subtitle").textContent;
    vieweImage.setAttribute("alt", `фото: ${textImage}`);
    imageTitle.textContent = textImage;
    openPopup(popupOpen);
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
}

function fillPopupProfileImage() {
    nameInputEdit.value = userNameProfileEdit.textContent; //добавления в ред.окно прежнего имени
    jobInputEdit.value = userInfoProfileEdit.textContent; //добавления в ред.окно прежнего статуса
}

function resetPopupAddImage() {
    formPopupAdd.reset();
}

/*-----ф-я закрытия попапа------*/
const closingPopup = () => {
    const popupCloseButtonList = Array.from(document.querySelectorAll(".popup__close"));
    popupCloseButtonList.forEach((popupCloseButton) => {
        popupCloseButton.addEventListener("click", function(evt) {
            const popupCloseItem = popupCloseButton.closest(".popup");
            closePopup(popupCloseItem);
        });
    });
}
closingPopup();


/*------кнопки------*/

addButton.addEventListener("click", () => {
    resetPopupAddImage();
    openPopup(popupAdd);
});

redactButton.addEventListener("click", () => {
    fillPopupProfileImage(); // для попапа редак-я (сохр прежних данных)
    openPopup(popupEdit);
});

/*--------применение обновленных данных-----------*/
function handleFormSubmitEdit(evt) {
    evt.preventDefault();
    userNameProfileEdit.textContent = nameInputEdit.value;
    userInfoProfileEdit.textContent = jobInputEdit.value;
    closePopup(popupEdit);
}

function handleFormSubmitAdd(evt) {
    evt.preventDefault();
    addCard({ name: nameInputAdd.value, link: linkInputAdd.value });
    closePopup(popupAdd);
}

/*-----обр-к создания/редактирования карточки----*/
formPopupEdit.addEventListener("submit", handleFormSubmitEdit);
formPopupAdd.addEventListener("submit", handleFormSubmitAdd);

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); //находим нужный спан
    inputElement.classList.add("popup__input_type_error"); //стилизуем нужный инпут при ошибке
    errorElement.textContent = errorMessage; // помещаем в спан стандартный текст ошибки
    errorElement.classList.add("popup__input-error-text"); //стилизуем спан?
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); //находим нужный спан
    inputElement.classList.remove("popup__input_type_error"); // удаляем класс ошибки
    errorElement.classList.remove("popup__input-error-text"); //удаляем видимость спана ошибки
    errorElement.textContent = ""; //очищаем спан
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        //если содержимое невалидно
        showInputError(
            //пказываем ошибку
            formElement,
            inputElement,
            inputElement.validationMessage
        );
    } else {
        hideInputError(formElement, inputElement);
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".popup__input")); //массив инпутов одной формы
    const buttonElement = formElement.querySelector(".popup__save-button"); //кнопка формы

    // чтобы проверить состояние кнопки в самом начале
    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        //навешиваем слушатель на каждый из инпутов
        inputElement.addEventListener("input", function () {
            checkInputValidity(formElement, inputElement);
            // чтобы проверять его при изменении любого из полей
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(".popup__form")); //массив форм
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", function (evt) {
            evt.preventDefault();
        });
        const fieldsetList = Array.from(
            formElement.querySelectorAll(".popup__set")
        );
        fieldsetList.forEach((fieldSet) => {
            setEventListeners(fieldSet);
        });
    });
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add("popup__save-button_inactive");
        buttonElement.setAttribute("disabled", "disabled");
    } else {
        buttonElement.classList.remove("popup__save-button_inactive");
        buttonElement.removeAttribute("disabled", "disabled");
    }
};

enableValidation();
