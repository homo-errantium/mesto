import Section from "./Section.js";
// import SubmitForm from "./FormSubmit.js";
import { Card } from "./Card.js";
import {
    initialCards,
    selectors,
    popupEdit,
    popupAdd,
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
import {
    openPopup,
    closePopup,
    closePopupOverlay,
    fillPopupProfileImage,
    handleClosePopup,
} from "./utils.js";

/*------ф-я создания карточки-----*/
function createCard(item) {
    const cardItem = new Card(item, selectors);
    const cardElement = cardItem.generateCard();
    return cardElement;
}

// /*-----ф-я добавления карточек в блок-------*/
// function addCard(item) {
//     const newCard = creatCard(item);
//     places.prepend(newCard);
// }

// /*-----дефолтное создание каточек из массива-------*/
// initialCards.forEach(addCard);

const сardList = new Section(
    {
        items: initialCards,
        renderer: (item) => {
            const card = createCard(item);
            сardList.addItem(card);
        },
    },
    ".places"
);

сardList.renderItems();

// const form = new SubmitForm({ selector: ".popup" });
// const formElement = form.generate();
// const formRenderer = new Section(
//     {data: [],},".form-section"
// );
// formRenderer.setItem(formElement);

/*--------ф-я закрытия при клике на оверлей------*/
closePopupOverlay();

handleClosePopup();

/*------кнопки------*/
addButton.addEventListener("click", () => {
    openPopup(popupAdd);
});

redactButton.addEventListener("click", () => {
    formPopupEditValidator.resetValidation();

    formPopupEditValidator.disableSubmitButton(); //  ПОВТОРНОЕ отключение кнопки попапа редактирования по-другому не реализовать  //

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
    evt.target.reset();
    const buttonAdd = evt.submitter;
    formPopupAddValidator.disableSubmitButton();
}

/*-----обр-к создания/редактирования карточки----*/
formPopupEdit.addEventListener("submit", handleFormSubmitEdit);
formPopupAdd.addEventListener("submit", handleFormSubmitAdd);

/*--------вызов навешивания валидации-----------*/
const formPopupEditValidator = new FormValidator(selectors, formPopupEdit);
formPopupEditValidator.enableValidation();
const formPopupAddValidator = new FormValidator(selectors, formPopupAdd);
formPopupAddValidator.enableValidation();
