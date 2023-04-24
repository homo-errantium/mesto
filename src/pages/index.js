import "./index.css";
import Section from "../scripts/components/Section.js";
import Card from "../scripts/components/Card.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import UserInfo from "../scripts/components/UserInfo.js";
import FormValidator from "../scripts/components/FormValidator.js";
import {
    initialCards,
    selectors,
    popupOpenVieweImage,
    redactButton,
    addButton,
    formPopupEdit,
    formPopupAdd,
    nameInputEdit,
    jobInputEdit,
    userNameProfileEdit,
    userInfoProfileEdit,
} from "../scripts/utils/constants.js";

/*-----------------------Блок создания Карточки---------------------*/
/*создание экземпляра класса слоя-вставки*/
const сardList = new Section(
    {
        data: initialCards,
        renderer: (data) => {
            const card = createCard(data);
            сardList.addItem(card);
        },
    },
    selectors.placesSelector
);

/*ф-я создания карточки*/
function createCard(data) {
    const cardItem = new Card({ data, selectors }, handleCardClick);
    const cardElement = cardItem.generateCard();
    return cardElement;
}

/*создание экземпляра формы добавления карточек*/
const popupAddCard = new PopupWithForm({
    popupSelector: selectors.popupAddClass,
    handleFormSubmit: (data) => {
        const newCard = createCard(data);
        сardList.addItem(newCard);
        popupAddCard.closePopup();
    },
    selectors,
});

/*прорисовка и вставка дефолтных карточек*/
сardList.renderItems();

/*навешывание прослушек на форму добавления карточки*/
popupAddCard.setEventListeners();

/*навешывание прослушки на кнопку добавления*/
addButton.addEventListener("click", () => {
    formPopupAddValidator.resetValidation();
    formPopupAddValidator.disableSubmitButton();
    popupAddCard.openPopup();
});

/*-----------------------Блок открытия Карточки---------------------*/
/*создание экземпляра формы открытия карточек*/
const imagePopup = new PopupWithImage(popupOpenVieweImage, selectors);

/*навешывание прослушки на форму открытия карточки*/
imagePopup.setEventListeners();

/*------ф-я открытия карточки-----*/
function handleCardClick(title, image) {
    imagePopup.open(title, image);
}

/*-----------------------Блок редактирования Профиля---------------------*/
/*создание экземпляра формы редактрования профиля*/
const popupEditProfile = new PopupWithForm({
    popupSelector: selectors.popupEditClass,
    handleFormSubmit: (info) => {
        userInfo.setUserInfo(info);
        popupEditProfile.closePopup();
    },
    selectors,
});

/*навешивание прослушки на кпопку редактирования*/
redactButton.addEventListener("click", () => {
    const info = userInfo.getUserInfo();
    nameInputEdit.value = info.name;
    jobInputEdit.value = info.about;
    popupEditProfile.openPopup();
    formPopupEditValidator.resetValidation();
    formPopupEditValidator.disableSubmitButton();
});

/*навешывание прослушки на форму добавления карточки*/
popupEditProfile.setEventListeners();

/*---------------------Блок валидации карточек--------------------*/
const formPopupEditValidator = new FormValidator(selectors, formPopupEdit);
formPopupEditValidator.enableValidation();
const formPopupAddValidator = new FormValidator(selectors, formPopupAdd);
formPopupAddValidator.enableValidation();

/*-----------------------Блок сбора Информации---------------------*/
/*создание экземпляра формы сбора информации*/
const userInfo = new UserInfo(
    userNameProfileEdit, //то, что есть
    userInfoProfileEdit //то, что есть
);
