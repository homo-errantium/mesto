const popup = document.querySelector(".popup");
const places = document.querySelector(".places");
const profile = document.querySelector(".profile");
const redactButton = profile.querySelector(".profile__redact-button");
const closeButton = popup.querySelector(".popup__close");
const saveButton = popup.querySelector(".popup__save-button");
const formPopup = popup.querySelector(".popup__form");
const nameInput = popup.querySelector(".popup__input_type_username");
const jobInput = popup.querySelector(".popup__input_type_userinfo");
const usernameProfile = profile.querySelector(".profile__title");
const userninfoProfile = profile.querySelector(".profile__subtitle");
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

initialCards.forEach(function (card) {
    const newCard = document
        .querySelector("#placesCardTemplate")
        .content.cloneNode(true);
    const newCardImage = newCard.querySelector(".places__image");
    newCardImage.setAttribute("src", card.link);
    const newCardHeading = newCard.querySelector(".places__subtitle");
    newCardHeading.textContent = card.name;
    places.append(newCard);
});

function closePopup() {
    popup.classList.remove("popup_opened");
}

function openPopup() {
    popup.classList.add("popup_opened");
    nameInput.value = usernameProfile.textContent;
    jobInput.value = userninfoProfile.textContent;
}

redactButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);

function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    usernameProfile.textContent = nameInput.value;
    userninfoProfile.textContent = jobInput.value;
    closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formPopup.addEventListener("submit", handleFormSubmit);

// function activeLikeButton() {
//     likeLogo.classList.toggle("places__like-logo_active");
//     if (likeLogo.classList.contains("places__like-logo_active") === true) {
//         likeLogo.setAttribute("src", "./images/logo-like-active.svg");
//     } else {
//         likeLogo.setAttribute("src", "./images/logo-like.svg");
//     }
// }

// likeLogo.addEventListener("click", activeLikeButton);
