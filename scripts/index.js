const popup = document.querySelector(".popup");
const profile = document.querySelector(".profile");
const redactButton = profile.querySelector(".profile__redact-button");
const closeButton = popup.querySelector(".popup__close");
const saveButton = popup.querySelector(".popup__save-button");
const formPopup = popup.querySelector(".popup__form");
const nameInput = popup.querySelector(".popup__username");
const jobInput = popup.querySelector(".popup__userinfo");
const usernameProfile = profile.querySelector(".profile__title");
const userninfoProfile = profile.querySelector(".profile__subtitle");
const likeLogo = document.querySelector(".places__like-logo");

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
