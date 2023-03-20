const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
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

/*--------ф-я открытия/закрытия попап-а------*/
function closePopup(popup) {
    document.removeEventListener("keydown", escapeButtonClose);
    cleanErrorInput(popup);
    popup.classList.remove("popup_opened");
}

function openPopup(popup) {
    document.addEventListener("keydown", escapeButtonClose);
    checkButtonState(popup, selectors);
    popup.classList.add("popup_opened");
    closePopupOverlay(popup);
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
function closePopupOverlay(popup) {
    popup.addEventListener("click", function (event) {
        const target = event.target;
        if (target.closest(".popup") && !target.closest(".popup__container"))
            closePopup(popup);
        else if (target.closest(".popup")) event.stopPropagation();
    });
}

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

/*--------ф-я сброса полей формы------*/
function resetPopupAddImage() {
    formPopupAdd.reset();
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
function escapeButtonClose(event) {
    if (event.key === "Escape") {
        const currentPopupItem = document.querySelector(".popup_opened");
        closePopup(currentPopupItem);
    }
}

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

/*--------добавление новых данных-----------*/
function handleFormSubmitAdd(evt) {
    evt.preventDefault();
    addCard({ name: nameInputAdd.value, link: linkInputAdd.value });
    closePopup(popupAdd);
}

/*-----обр-к создания/редактирования карточки----*/
formPopupEdit.addEventListener("submit", handleFormSubmitEdit);
formPopupAdd.addEventListener("submit", handleFormSubmitAdd);

/*--------вызов навешивания валидации-----------*/
enableValidation(selectors);
