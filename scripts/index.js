const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const popupOpen = document.querySelector(".popup_type_open-image");
const places = document.querySelector(".places");
const profile = document.querySelector(".profile");
const redactButton = profile.querySelector(".profile__redact-button");
const addButton = profile.querySelector(".profile__add-button");
const closeButtonEdit = popupEdit.querySelector(".popup__close");
const closeButtonAdd = popupAdd.querySelector(".popup__close");
const closeButtonOpen = popupOpen.querySelector(".popup__close");
const saveButtonEdit = popupEdit.querySelector(".popup__save-button");
const creatButtonAdd = popupAdd.querySelector(".popup__save-button");
const formPopupEdit = popupEdit.querySelector(".popup__form");
const formPopupAdd = popupAdd.querySelector(".popup__form");
const nameInputEdit = popupEdit.querySelector(".popup__input_type_username");
const nameInputAdd = popupAdd.querySelector(".popup__input_type_username");
const jobInputEdit = popupEdit.querySelector(".popup__input_type_userinfo");
const linkInputAdd = popupAdd.querySelector(".popup__input_type_userinfo");
const usernameProfileEdit = profile.querySelector(".profile__title");
const userninfoProfileEdit = profile.querySelector(".profile__subtitle");
const vieweImage = popupOpen.querySelector(".popup__viewe-image");
const imageTitle = popupOpen.querySelector(".popup__open-image-title");

const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "`https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg`",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

/*---------------ф-я создание карточек из массива--------------*/
function creatArrayCard(card) {
    const arrayCard = document
        .querySelector("#placesCardTemplate")
        .content.cloneNode(true);
    const arrayCardImage = arrayCard.querySelector(".places__image");
    arrayCardImage.setAttribute("src", card.link);
    const arrayCardHeading = arrayCard.querySelector(".places__subtitle");
    arrayCardHeading.textContent = card.name;
    const likeButton = arrayCard.querySelector(".places__like-logo");
    likeButton.addEventListener("click", handleLikeButton);
    const deleteButton = arrayCard.querySelector(".places__delete-button");
    deleteButton.addEventListener("click", handleDeleteButton);
    arrayCardImage.addEventListener("click", creatImagePopup);
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
    if (
        likeCardButton.classList.contains("places__like-logo_active") === true
    ) {
        likeCardButton.style.backgroundImage =
            "url(../../../images/logo-like-active.svg)";
    } else {
        likeCardButton.style.backgroundImage =
            "url(../../../images/logo-like.svg)";
    }
}

/*-----ф-я добавления созданных из массива карточек-------*/
function addArrayCard(card) {
    const arrayNewCard = creatArrayCard(card);
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
    const creatNewCardHeading = creatNewCard.querySelector(".places__subtitle");
    creatNewCardHeading.textContent = nameInputAdd.value;
    const likeButton = creatNewCard.querySelector(".places__like-logo");
    likeButton.addEventListener("click", handleLikeButton);
    const deleteButton = creatNewCard.querySelector(".places__delete-button");
    deleteButton.addEventListener("click", handleDeleteButton);
    creatNewCardImage.addEventListener("click", creatImagePopup);
    return creatNewCard;
}

/*---------------ф-я добавления карточек--------------*/
function addNewCard(nameInputAdd, linkInputAdd) {
    const newCard = creatNewCards(nameInputAdd, linkInputAdd);
    places.prepend(newCard);
}

/*-------------открытие/закрытие попап-а------------------*/

function creatImagePopup(event) {
    const clickImage = event.target;
    vieweImage.setAttribute("src", clickImage.src);
    const clickImageItem = clickImage.closest(".places__item");
    const textImage =
        clickImageItem.querySelector(".places__subtitle").textContent;
    vieweImage.setAttribute("alt", `фото: ${textImage}`);
    imageTitle.textContent = textImage;
    openImagePopup();
}

function openImagePopup() {
    popupOpen.classList.add("popup_opened");
}

function closeImagePopup() {
    popupOpen.classList.remove("popup_opened");
}

function closeAddPopup() {
    popupAdd.classList.remove("popup_opened");
    nameInputAdd.value = "";
    linkInputAdd.value = "";
}

function openAddPopup() {
    popupAdd.classList.add("popup_opened");
}

function closeEditPopup() {
    popupEdit.classList.remove("popup_opened");
}

function openEditPopup() {
    popupEdit.classList.add("popup_opened");
    nameInputEdit.value = usernameProfileEdit.textContent; //добавления в ред.окно прежнего имени
    jobInputEdit.value = userninfoProfileEdit.textContent; //добавления в ред.окно прежнего статуса
}

closeButtonOpen.addEventListener("click", closeImagePopup);
addButton.addEventListener("click", openAddPopup);
closeButtonAdd.addEventListener("click", closeAddPopup);
redactButton.addEventListener("click", openEditPopup);
closeButtonEdit.addEventListener("click", closeEditPopup);

/*------------------------------применение обновленных данных-------------------*/
function handleFormSubmitEdit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    usernameProfileEdit.textContent = nameInputEdit.value;
    userninfoProfileEdit.textContent = jobInputEdit.value;
    closeEditPopup();
}

function handleFormSubmitAdd(evt) {
    evt.preventDefault();
    addNewCard();
    closeAddPopup();
}

formPopupEdit.addEventListener("submit", handleFormSubmitEdit);
formPopupAdd.addEventListener("submit", handleFormSubmitAdd);

/*--------------------------лайки-------------------------------*/
