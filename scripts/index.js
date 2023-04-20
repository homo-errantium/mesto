import Section from "./Section.js";
import Card from "./Card.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";
import {
    initialCards,
    selectors,
    popupEdit,
    popupAdd,
    popupOpenVieweImage,
    places,
    redactButton,
    addButton,
    formPopupEdit,
    formPopupAdd,
    nameInputEdit,
    nameInputAdd,
    jobInputEdit,
    linkInputAdd,
    userNameProfileEdit,
    userInfoProfileEdit,
} from "./constants.js";
import { FormValidator } from "./FormValidator.js";

/*создание экземпляра класса слоя-вставки*/
const сardList = new Section(
    {
        data: initialCards,
        renderer: (data) => {
            const card = createCard(data);
            сardList.addItem(card);
        },
    },
    places
);

/*прорисовка и вставка дефолтных карточек*/
сardList.renderItems();

/*------ф-я создания карточки-----*/
function createCard(data) {
    const cardItem = new Card({ data, selectors }, handleCardClick); //изменить selectors
    const cardElement = cardItem.generateCard();
    return cardElement;
}

/*создание экземпляра формы добавления карточек*/
const popupAddCard = new PopupWithForm({
    popupSelector: popupAdd,
    handleFormSubmit: (data) => {
        const newCard = createCard(data);
        сardList.addItem(newCard);
        popupAddCard.closePopup();
    },
});

/*навешывание прослушек на форму добавления карточки*/
popupAddCard.setEventListeners();

/*создание экземпляра формы открытия карточек*/
const imagePopup = new PopupWithImage(popupOpenVieweImage);

/*навешывание прослушки на форму открытия карточки*/
imagePopup.setEventListeners();

/*------ф-я открытия карточки-----*/
function handleCardClick(title, image) {
    imagePopup.open(title, image);
}

/*------навешывание прослушки на кнопку добавления------*/
addButton.addEventListener("click", () => {
    popupAddCard.openPopup();
    // addFormValidation.hideAllErrors();
    formPopupAddValidator.disableSubmitButton();
});

/*создание экземпляра формы редактрования профиля*/
const popupEditProfile = new PopupWithForm({
    popupSelector: popupEdit,
    handleFormSubmit: (info) => {
        userInfo.setUserInfo(info);
        popupEditProfile.closePopup();
    },
});

/*навешывание прослушки на форму добавления карточки*/
popupEditProfile.setEventListeners();

/*создание экземпляра формы сбора информации*/
const userInfo = new UserInfo({
    nameSelector: ".profile__title", //то, что есть
    userInfoSelector: ".profile__subtitle", //то, что есть
});

redactButton.addEventListener("click", () => {
    const info = userInfo.getUserInfo();
    nameInputEdit.value = info.name;
    jobInputEdit.value = info.about;
    popupEditProfile.openPopup();
    formPopupEditValidator.resetValidation();
    formPopupEditValidator.disableSubmitButton();
});

/*--------применение обновленных данных-----------*/
// function handleFormSubmitEdit(evt) {
//     evt.preventDefault();
//     userInfo.setUserInfo(data);
// }

/*--------добавление новых данных-----------*/
// function handleFormSubmitAdd(evt) {
//     evt.preventDefault();
//     addCard({ name: nameInputAdd.value, link: linkInputAdd.value });
//     closePopup(popupAdd);
//     evt.target.reset();
//     const buttonAdd = evt.submitter;
//     formPopupAddValidator.disableSubmitButton();
// }

/*-----обр-к создания/редактирования карточки----*/
// formPopupEdit.addEventListener("submit", handleFormSubmitEdit);
// formPopupAdd.addEventListener("submit", handleFormSubmitAdd);

/*--------вызов навешивания валидации-----------*/
const formPopupEditValidator = new FormValidator(selectors, formPopupEdit);
formPopupEditValidator.enableValidation();
const formPopupAddValidator = new FormValidator(selectors, formPopupAdd);
formPopupAddValidator.enableValidation();
