const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const popupOpen = document.querySelector(".popup_type_open-image");
const places = document.querySelector(".places");
const profile = document.querySelector(".profile");
const redactButton = profile.querySelector(".profile__redact-button");
const addButton = profile.querySelector(".profile__add-button");
const formCollection = document.forms;
const formPopupEdit = formCollection.popupEditForm;
const formPopupAdd = formCollection.popupAddForm;
const nameInputEdit = popupEdit.querySelector(".popup__input_type_username");
const nameInputAdd = popupAdd.querySelector(".popup__input_type_placename");
const jobInputEdit = popupEdit.querySelector(".popup__input_type_userinfo");
const linkInputAdd = popupAdd.querySelector(".popup__input_type_placelink");
const userNameProfileEdit = profile.querySelector(".profile__title");
const userInfoProfileEdit = profile.querySelector(".profile__subtitle");
const vieweImage = popupOpen.querySelector(".popup__viewe-image");
const imageTitle = popupOpen.querySelector(".popup__open-image-title");

/*--------ф-я открытия/закрытия попап-а------*/
function closePopup(popup) {
    document.removeEventListener("keydown", handleEscapeButton);
    popup.classList.remove("popup_opened");
}

function openPopup(popup) {
    document.addEventListener("keydown", handleEscapeButton);
    popup.classList.add("popup_opened");
}

/*-----ф-я удаления карточки------*/
function handleDeleteButton(event) {
    const deleteCardButton = event.target;
    const deleteCard = deleteCardButton.closest(".places__item");
    deleteCard.remove();
}

/*----ф-я лайк-----*/
function handleLikeButton(event) {
    const likeCardButton = event.target;
    likeCardButton.classList.toggle("places__like-logo_active");
}

/*--------обр-к открытие попап-а------*/
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

closePopupOverlay(selectors);

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

/*-----ф-я добавления карточек в блок-------*/
function addCard(card) {
    const newCardItem = creatCard(card);
    places.prepend(newCardItem);
}

/*-----дефолтное создание каточек из массива-------*/
initialCards.forEach(addCard);

/*--------ф-я дефолтного заполнения полей профайла------*/
function fillPopupProfileImage() {
    nameInputEdit.value = userNameProfileEdit.textContent; //добавления в ред.окно прежнего имени
    jobInputEdit.value = userInfoProfileEdit.textContent; //добавления в ред.окно прежнего статуса
}

/*--------проверка кнопки при повторном вызове попапа-----------*/
function checkButtonState(popup, selectors) {
    const buttonElement = popup.querySelector(selectors.submitButtonSelector);
    if (popup === popupAdd) {
        const inputList = Array.from(
            popup.querySelectorAll(selectors.inputSelector)
        );
        toggleButtonState(inputList, buttonElement, selectors);
    } else if (popup === popupEdit) {
        disableSubmitButton(popupEdit, selectors);
    }
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

handleClosePopup();

/*--------ф-я закрытия по клавише------*/
function handleEscapeButton(event) {
    if (event.key === "Escape") {
        const currentPopupItem = document.querySelector(".popup_opened");
        closePopup(currentPopupItem);
    }
}

/*------кнопки------*/
addButton.addEventListener("click", () => {
    checkButtonState(popupAdd, selectors);
    openPopup(popupAdd);
});

redactButton.addEventListener("click", () => {
    cleanErrorInput(popupEdit);
    const submitButtonEdit = popupEdit.querySelector(
        selectors.submitButtonSelector
    );
    disableSubmitButton(submitButtonEdit, selectors); // чтобы при открытии кнопка была неактивной (наставник)
    // checkButtonState(popupEdit, selectors);
    fillPopupProfileImage(); // для попапа редак-я (сохр прежних данных)
    openPopup(popupEdit);
});

/*--------применение обновленных данных-----------*/
function handleFormSubmitEdit(evt) {
    evt.preventDefault();
    userNameProfileEdit.textContent = nameInputEdit.value;
    userInfoProfileEdit.textContent = jobInputEdit.value;
    closePopup(popupEdit);
    evt.target.reset();
    // const submitButtonEdit = popupEdit.querySelector(selectors.submitButtonSelector);
    // disableSubmitButton(submitButtonEdit, selectors); // не используется, т.к. без сабмита будет активной
}

/*--------добавление новых данных-----------*/
function handleFormSubmitAdd(evt) {
    evt.preventDefault();
    addCard({ name: nameInputAdd.value, link: linkInputAdd.value });
    closePopup(popupAdd);
    evt.target.reset();
    const buttonAdd = popupAdd.querySelector(selectors.submitButtonSelector);
    disableSubmitButton(buttonAdd, selectors);
}

/*-----обр-к создания/редактирования карточки----*/
formPopupEdit.addEventListener("submit", handleFormSubmitEdit);
formPopupAdd.addEventListener("submit", handleFormSubmitAdd);

/*--------вызов навешивания валидации-----------*/
enableValidation(selectors);
