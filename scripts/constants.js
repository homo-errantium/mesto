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
    cardTemplateId: "placesCardTemplate",
    containerSelector: ".popup__container",
    formSelector: ".popup__form",
    errorTextClass: "popup__input-error-text",
    inactiveButtonClass: "popup__save-button_inactive",
    inputSelector: ".popup__input",
    inputErrorClass: "popup__input_type_error",
    popupCloseClass: ".popup__close",
    placesSelector: ".places",
    placesItemSelector: ".places__item",
    placesImageSelector: ".places__image",
    placesSubtitleSelector: ".places__subtitle",
    placesLikeLogoSelector: ".places__like-logo",
    placesLikeLogoActiveClass: "places__like-logo_active",
    placesDeleteButtonSelector: ".places__delete-button",
    popupEditClass: ".popup_type_edit",
    popupAddClass: ".popup_type_add",
    popupVieweImageSelector: ".popup__viewe-image",
    popupOpenImageTitleSelector: ".popup__open-image-title",
    submitButtonSelector: ".popup__save-button",
};

const popupOpenVieweImage = ".popup_type_open-image";
const profile = document.querySelector(".profile");
const redactButton = profile.querySelector(".profile__redact-button");
const addButton = profile.querySelector(".profile__add-button");
const formCollection = document.forms;
const formPopupEdit = formCollection.popupEditForm;
const formPopupAdd = formCollection.popupAddForm;
const nameInputEdit = document.querySelector(".popup__input_type_username");
const nameInputAdd = document.querySelector(".popup__input_type_placename");
const jobInputEdit = document.querySelector(".popup__input_type_userinfo");
const userNameProfileEdit = document.querySelector(".profile__title"); //то, что есть
const userInfoProfileEdit = document.querySelector(".profile__subtitle"); //то, что есть

export {
    initialCards,
    selectors,
    popupOpenVieweImage,
    profile,
    redactButton,
    addButton,
    formCollection,
    formPopupEdit,
    formPopupAdd,
    nameInputEdit,
    nameInputAdd,
    jobInputEdit,
    userNameProfileEdit,
    userInfoProfileEdit,
};
