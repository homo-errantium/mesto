const popupEdit = document.querySelector(".popup_type-edit");
const popupAdd = document.querySelector(".popup_type-add");
const places = document.querySelector(".places");
const profile = document.querySelector(".profile");
const redactButton = profile.querySelector(".profile__redact-button");
const addButton = profile.querySelector(".profile__add-button");
const closeButtonEdit = popupEdit.querySelector(".popup__close");
const closeButtonAdd = popupAdd.querySelector(".popup__close");
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
const likeLogo = document.querySelector(".places__like-logo");

const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
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

/*---------------создание карточек из массива--------------*/
const creatArrayCard = (card) => {
    const arrayCard = document
        .querySelector("#placesCardTemplate")
        .content.cloneNode(true);
    const arrayCardImage = arrayCard.querySelector(".places__image");
    arrayCardImage.setAttribute("src", card.link);
    const arrayCardHeading = arrayCard.querySelector(".places__subtitle");
    arrayCardHeading.textContent = card.name;
    places.append(arrayCard);
};

initialCards.forEach(creatArrayCard);

/*---------------создание новой карточки--------------*/
const creatNewCard = () => {
    const newCard = document
        .querySelector("#placesCardTemplate")
        .content.cloneNode(true);
    const newCardImage = newCard.querySelector(".places__image");
    newCardImage.setAttribute("src", linkInputAdd.value); //как-то вставить
    const newCardHeading = newCard.querySelector(".places__subtitle");
    newCardHeading.textContent = nameInputAdd.value; //как-то вставить
    places.prepend(newCard);
};

/*-------------открытие/закрытие попап-а------------------*/
function closeAddPopup() {
    popupAdd.classList.remove("popup_opened");
}

function openAddPopup() {
    popupAdd.classList.add("popup_opened");
}

function closeEditPopup() {
    popupEdit.classList.remove("popup_opened");
}

function openEditPopup() {
    popupEdit.classList.add("popup_opened");
    nameInputEdit.value = usernameProfileEdit.textContent;
    jobInputEdit.value = userninfoProfileEdit.textContent;
}

addButton.addEventListener("click", openAddPopup);
closeButtonAdd.addEventListener("click", closeAddPopup);
redactButton.addEventListener("click", openEditPopup);
closeButtonEdit.addEventListener("click", closeEditPopup);

/*------------------------------добавление данных-------------------*/
function handleFormSubmitEdit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    usernameProfileEdit.textContent = nameInputEdit.value;
    userninfoProfileEdit.textContent = jobInputEdit.value;
    closeEditPopup();
}

function handleFormSubmitAdd(evt) {
    evt.preventDefault();
    creatNewCard();
    closeAddPopup();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formPopupEdit.addEventListener("submit", handleFormSubmitEdit);
formPopupAdd.addEventListener("submit", handleFormSubmitAdd);

/*--------------------------лайки-------------------------------*/
// function activeLikeButton() {
//     likeLogo.classList.toggle("places__like-logo_active");
//     if (likeLogo.classList.contains("places__like-logo_active") === true) {
//         likeLogo.setAttribute("src", "./images/logo-like-active.svg");
//     } else {
//         likeLogo.setAttribute("src", "./images/logo-like.svg");
//     }
// }

// likeLogo.addEventListener("click", activeLikeButton);
