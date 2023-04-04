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

const selectors = {
    containerSelector: ".popup__container",
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save-button",
    inactiveButtonClass: "popup__save-button_inactive",
    inputErrorClass: "popup__input_type_error",
    errorTextClass: "popup__input-error-text",
    popupCloseClass: ".popup__close",
};

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
const cardTemplate = document.getElementById("placesCardTemplate");
export {
    initialCards,
    selectors,
    popupEdit,
    popupAdd,
    popupOpen,
    places,
    profile,
    redactButton,
    addButton,
    formCollection,
    formPopupEdit,
    formPopupAdd,
    nameInputEdit,
    nameInputAdd,
    jobInputEdit,
    linkInputAdd,
    userNameProfileEdit,
    userInfoProfileEdit,
    vieweImage,
    imageTitle,
    cardTemplate,
};
