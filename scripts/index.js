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
    cardTemplate,
} from "./constants.js";
import { FormValidator } from "./FormValidator.js";
import {
    openPopup,
    closePopup,
    closePopupOverlay,
    disableSubmitButton,
    fillPopupProfileImage,
    handleClosePopup,
    cleanErrorInput,
} from "./utils.js";

/*-----ф-я добавления карточек в блок-------*/
function addCard(item) {
    const card = new Card(item, cardTemplate);
    const cardElement = card.generateCard();
    places.prepend(cardElement);
}

/*-----дефолтное создание каточек из массива-------*/
initialCards.forEach(addCard);

/*--------ф-я закрытия при клике на оверлей------*/

closePopupOverlay();

handleClosePopup();

/*------кнопки------*/
addButton.addEventListener("click", () => {
    openPopup(popupAdd);
});

redactButton.addEventListener("click", () => {
    cleanErrorInput(popupEdit);
    const submitButtonEdit = popupEdit.querySelector(
        selectors.submitButtonSelector
    );
    disableSubmitButton(submitButtonEdit); // чтобы при открытии кнопка была неактивной
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
    disableSubmitButton(buttonAdd);
}

/*-----обр-к создания/редактирования карточки----*/
formPopupEdit.addEventListener("submit", handleFormSubmitEdit);
formPopupAdd.addEventListener("submit", handleFormSubmitAdd);

/*--------вызов навешивания валидации-----------*/
const formPopupEditValidator = new FormValidator(selectors, formPopupEdit);
formPopupEditValidator.enableValidation();
const formPopupAddValidator = new FormValidator(selectors, formPopupAdd);
formPopupAddValidator.enableValidation();
