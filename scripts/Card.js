class Card {
    constructor(data) {
        this._title = data.name;
        this._image = data.link;
    }

    /*-----взятие разметки из html-----*/
    _getTemplate() {
        const cardElement = document
            .querySelector("#placesCardTemplate")
            .content.cloneNode(true);
        return cardElement;
    }

    /*-----создание карточки-----*/
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

    /*-----навешивание  слушателей-----*/
    _setEventListeners() {
        const likeButton = this._element.querySelector(".places__like-logo");
        likeButton.addEventListener("click", this._handleLikeButton);

        const deleteButton = this._element.querySelector(
            ".places__delete-button"
        );
        deleteButton.addEventListener("click", this._handleDeleteButton);

        const newCardImage = this._element.querySelector(".places__image");
        newCardImage.addEventListener("click", this._handleCardOpen);
    }

    /*-----открытие режима просмотра-----*/
    _handleCardOpen() {
        const currentCardImage = event.target;
        const vieweImage = document.querySelector(".popup__viewe-image");
        vieweImage.setAttribute("src", currentCardImage.src);
        const clickImageItem = currentCardImage.closest(".places__item");
        const textImage =
            clickImageItem.querySelector(".places__subtitle").textContent;
        vieweImage.setAttribute("alt", `фото: ${textImage}`);
        imageTitle.textContent = textImage;
        openPopup(popupOpen);
    }

    /*-----удаление карточки-----*/
    _handleDeleteButton() {
        const deleteCard = event.target.closest(".places__item");
        deleteCard.remove();
    }

    /*-----лайк карточки-----*/
    _handleLikeButton() {
        const likeButton = event.target;
        likeButton.classList.toggle("places__like-logo_active");
    }
}
