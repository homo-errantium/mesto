const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const popupForm = document.querySelector(".popup__form");
const popupOpen = document.querySelector(".popup_type_open-image");
const places = document.querySelector(".places");
const profile = document.querySelector(".profile");
const redactButton = profile.querySelector(".profile__redact-button");
const addButton = profile.querySelector(".profile__add-button");
const closeButtonEdit = popupEdit.querySelector(".popup__close");
const closeButtonAdd = popupAdd.querySelector(".popup__close");
const closeButtonOpen = popupOpen.querySelector(".popup__close");
const formPopupEdit = popupEdit.querySelector(".popup__form");
const formPopupAdd = popupAdd.querySelector(".popup__form");
const nameInputEdit = popupEdit.querySelector(".popup__input_type_username");
const nameInputAdd = popupAdd.querySelector(".popup__input_type_username");
const jobInputEdit = popupEdit.querySelector(".popup__input_type_userinfo");
const linkInputAdd = popupAdd.querySelector(".popup__input_type_userinfo");
const userNameProfileEdit = profile.querySelector(".profile__title");
const userInfoProfileEdit = profile.querySelector(".profile__subtitle");
const vieweImage = popupOpen.querySelector(".popup__viewe-image");
const imageTitle = popupOpen.querySelector(".popup__open-image-title");

/*---------------ф-я создание карточек--------------*/
function creatCard(card) {
    const arrayCard = document
        .querySelector("#placesCardTemplate")
        .content.cloneNode(true);
    const arrayCardImage = arrayCard.querySelector(".places__image");
    arrayCardImage.setAttribute("src", card.link);
    arrayCardImage.setAttribute("alt", `фото: ${card.name}`);
    const arrayCardHeading = arrayCard.querySelector(".places__subtitle");
    arrayCardHeading.textContent = card.name;
    const likeButton = arrayCard.querySelector(".places__like-logo");
    likeButton.addEventListener("click", handleLikeButton);
    const deleteButton = arrayCard.querySelector(".places__delete-button");
    deleteButton.addEventListener("click", handleDeleteButton);
    arrayCardImage.addEventListener("click", handleCardOpen);
    return arrayCard;
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

/*-----ф-я добавления созданных из массива карточек-------*/
function addArrayCard(card) {
    const arrayNewCard = creatCard(card);
    places.append(arrayNewCard);
}

initialCards.forEach(addArrayCard);

/*---------------создание новой карточки--------------*/
function creatNewCards(popupAdd) {
    const creatNewCard = document
        .querySelector("#placesCardTemplate")
        .content.cloneNode(true);
    const creatNewCardImage = creatNewCard.querySelector(".places__image");
    creatNewCardImage.setAttribute("src", linkInputAdd.value);
    creatNewCardImage.setAttribute("alt", `фото: ${nameInputAdd.value}`);
    const creatNewCardHeading = creatNewCard.querySelector(".places__subtitle");
    creatNewCardHeading.textContent = nameInputAdd.value;
    const likeButton = creatNewCard.querySelector(".places__like-logo");
    likeButton.addEventListener("click", handleLikeButton);
    const deleteButton = creatNewCard.querySelector(".places__delete-button");
    deleteButton.addEventListener("click", handleDeleteButton);
    creatNewCardImage.addEventListener("click", handleCardOpen);
    return creatNewCard;
}

/*---------------ф-я добавления карточек--------------*/
function addNewCard(nameInputAdd, linkInputAdd) {
    const newCard = creatNewCards(nameInputAdd, linkInputAdd);
    places.prepend(newCard);
}

/*-------------открытие/закрытие попап-а------------------*/

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

/*-------открытие/закрытие попап-а----- */
function openPopup(popup) {
    keepOldInfo(); // для попапа редак-я (сохр прежних данных)
    resetUnsaveInfo(); //для сброса попапа добавления
    popup.classList.add("popup_opened");
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
}

function keepOldInfo() {
    nameInputEdit.value = userNameProfileEdit.textContent; //добавления в ред.окно прежнего имени
    jobInputEdit.value = userInfoProfileEdit.textContent; //добавления в ред.окно прежнего статуса
}

function resetUnsaveInfo() {
    document.getElementById("popupAddForm").reset();
}

closeButtonOpen.addEventListener("click", () => {
    closePopup(popupOpen);
});

addButton.addEventListener("click", () => {
    openPopup(popupAdd);
});
closeButtonAdd.addEventListener("click", () => {
    closePopup(popupAdd);
});
closeButtonEdit.addEventListener("click", () => {
    closePopup(popupEdit);
});

redactButton.addEventListener("click", () => {
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
    addNewCard();
    closePopup(popupAdd);
}

formPopupEdit.addEventListener("submit", handleFormSubmitEdit);
formPopupAdd.addEventListener("submit", handleFormSubmitAdd);
