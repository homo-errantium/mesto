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

/*------кнопки------*/
closeButtonOpen.addEventListener("click", () => {
    closePopup(popupOpen);
});

addButton.addEventListener("click", () => {
    resetPopupAddImage();
    openPopup(popupAdd);
});
closeButtonAdd.addEventListener("click", () => {
    closePopup(popupAdd);
});
closeButtonEdit.addEventListener("click", () => {
    closePopup(popupEdit);
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

/*---------------------------*/
// Функция, которая добавляет класс с ошибкой
const showInputError = (element) => {
    element.classList.add("form__input_type_error");
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (element) => {
    element.classList.remove("form__input_type_error");
};

// Функция, которая проверяет валидность поля
const isValid = () => {
    if (!formInput.validity.valid) {
        // Если поле не проходит валидацию, покажем ошибку
        showInputError(formInput);
    } else {
        // Если проходит, скроем
        hideInputError(formInput);
    }
};

// Вызовем функцию isValid на каждый ввод символа
formInput.addEventListener("input", isValid);
