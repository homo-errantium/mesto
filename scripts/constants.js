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
    cardTemplateId: "placesCardTemplate",
};

const popupEdit = ".popup_type_edit";
const popupAdd = ".popup_type_add";
const popupOpenVieweImage = ".popup_type_open-image";
const places = ".places";
const profile = document.querySelector(".profile");
const redactButton = profile.querySelector(".profile__redact-button");
const addButton = profile.querySelector(".profile__add-button");
const formCollection = document.forms;
const formPopupEdit = formCollection.popupEditForm;
const formPopupAdd = formCollection.popupAddForm;
const nameInputEdit = document.querySelector(".popup__input_type_username");
const nameInputAdd = document.querySelector(".popup__input_type_placename");
const jobInputEdit = document.querySelector(".popup__input_type_userinfo");
const linkInputAdd = ".popup__input_type_placelink";
const userNameProfileEdit = ".profile__title"; //то, что есть
const userInfoProfileEdit = ".profile__subtitle"; //то, что есть
// const vieweImage = popupOpenVieweImage.querySelector(".popup__viewe-image");
// const imageTitle = popupOpenVieweImage.querySelector(
//     ".popup__open-image-title"
// );
// const submitButtonEdit = popupEdit.querySelector(
//     selectors.submitButtonSelector
// );

export {
    initialCards,
    selectors,
    popupEdit,
    popupAdd,
    popupOpenVieweImage,
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
    // vieweImage,
    // imageTitle,
    // submitButtonEdit,
};
