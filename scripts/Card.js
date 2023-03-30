const initCards = [
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

class Card {
    constructor(data) {
        this._title = data.name;
        this._image = data.link;
    }

    /*-----метод взятия разметки из html-----*/
    _getTemplate() {
        const cardElement = document
            .querySelector("#placesCardTemplate")
            .content.cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        const newCardImage = this._element.querySelector(".places__image");
        newCardImage.setAttribute("src", this._image);
        newCardImage.setAttribute("alt", `фото: ${this._title}`);
        this._element.querySelector(".places__subtitle").textContent =
            this._title;
        return this._element;
    }

    _setEventListeners() {
        const likeButton = this._element.querySelector(".places__like-logo");
        likeButton.addEventListener("click", () => {
            this._handleLikeButton(likeButton);
        });

        const deleteButton = this._element.querySelector(
            ".places__delete-button"
        );
        deleteButton.addEventListener("click", () => {
            this._handleDeleteButton(deleteButton);
        });

        const newCardImage = this._element.querySelector(".places__image");
        newCardImage.addEventListener("click", () => {
            this._handleCardOpen(newCardImage);
        });
    }

    //нужно переделать!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    _handleCardOpen(newCardImage) {
        const vieweImage = document.querySelector(".popup__viewe-image");
        vieweImage.setAttribute("src", newCardImage.src);
        const clickImageItem = newCardImage.closest(".places__item");
        const textImage =
            clickImageItem.querySelector(".places__subtitle").textContent;
        vieweImage.setAttribute("alt", `фото: ${textImage}`);
        imageTitle.textContent = textImage;
        openPopup(popupOpen);
    }

    _handleDeleteButton(deleteButton) {
        const deleteCard = deleteButton.closest(".places__item");
        deleteCard.remove();
    }

    _handleLikeButton(likeButton) {
        likeButton.classList.toggle("places__like-logo_active");
    }
}

initCards.forEach((item) => {
    const card = new Card(item);
    const cardElement = card.generateCard();
    document.body.append(cardElement);
});
