import {
    selectors,
    nameInputEdit,
    jobInputEdit,
    userNameProfileEdit,
    userInfoProfileEdit,
} from "./constants.js";

const image = document.querySelector(".popup__viewe-image");
const title = document.querySelector(".popup__open-image-title");

/*--------ф-я закрытия по клавише------*/
// function handleEscapeButton(event) {
//     if (event.key === "Escape") {
//         const currentPopupItem = document.querySelector(".popup_opened");
//         closePopup(currentPopupItem);
//     }
// }

/*--------ф-я закрытия при клике на оверлей------*/
// function closePopupOverlay() {
//     const popupList = Array.from(document.querySelectorAll(".popup"));
//     popupList.forEach((popupElement) => {
//         popupElement.addEventListener("mousedown", (evt) => {
//             if (evt.target.classList.contains("popup_opened")) {
//                 closePopup(popupElement);
//             }
//             if (evt.target.classList.contains(selectors.popupCloseClass)) {
//                 closePopup(popupElement);
//             }
//         });
//     });
// }

/*--------ф-я открытия/закрытия попап-а------*/
// function closePopup(popup) {
//     document.removeEventListener("keydown", handleEscapeButton);
//     popup.classList.remove("popup_opened");
// }

// function openPopup(popup) {
//     document.addEventListener("keydown", handleEscapeButton);
//     popup.classList.add("popup_opened");
// }

/*--------ф-я дефолтного заполнения полей профайла------*/
function fillPopupProfileImage() {
    nameInputEdit.value = userNameProfileEdit.textContent; //добавления в ред.окно прежнего имени
    jobInputEdit.value = userInfoProfileEdit.textContent; //добавления в ред.окно прежнего статуса
}

/*-----обраб-к закрытия попапа------*/
// function handleClosePopup() {
//     const popupCloseButtonList = Array.from(
//         document.querySelectorAll(".popup__close")
//     );
//     popupCloseButtonList.forEach((popupCloseButton) => {
//         popupCloseButton.addEventListener("click", function (evt) {
//             const popupCloseItem = popupCloseButton.closest(".popup");
//             closePopup(popupCloseItem); //ф-я самого закрытия
//         });
//     });
// }

function openImageClick(event) {
    const currentCardImage = event.target;
    const clickImageItem = currentCardImage.closest(".places__item");
    image.setAttribute("src", currentCardImage.src);
    const textImage =
        clickImageItem.querySelector(".places__subtitle").textContent;
    image.setAttribute("alt", `фото: ${textImage}`);
    title.textContent = textImage;
}

export {
    openPopup,
    closePopup,
    closePopupOverlay,
    fillPopupProfileImage,
    handleClosePopup,
    openImageClick,
};
