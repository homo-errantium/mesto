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
        this._newCard = this._getTemplate();
        this._setEventListeners();
        this._newCardImage = this._newCard.querySelector(".places__image");
        this._newCardImage.setAttribute("src", this._image);
        this._newCardImage.setAttribute("alt", `фото: ${this._title}`);
        this._newCard.querySelector(".places__subtitle").textContent =
            this._title;
        return this._newCard;
    }

    /*-----навешивание  слушателей-----*/
    _setEventListeners() {
        this._likeButton = this._newCard.querySelector(".places__like-logo");
        this._likeButton.addEventListener("click", this._handleLikeButton);

        this._deleteButton = this._newCard.querySelector(
            ".places__delete-button"
        );
        this._deleteButton.addEventListener("click", this._handleDeleteButton);

        this._newCardImage = this._newCard.querySelector(".places__image");
        this._newCardImage.addEventListener("click", this._handleCardOpen);
    }

    /*-----открытие режима просмотра-----*/
    _handleCardOpen(event) {
        this._currentCardImage = event.target;
        this._clickImageItem = this._currentCardImage.closest(".places__item");

        this._vieweImage = document.querySelector(".popup__viewe-image");
        this._vieweImage.setAttribute("src", this._currentCardImage.src);
        this._vieweImage.setAttribute("alt", `фото: ${this._textImage}`);
        this._textImage =
            this._clickImageItem.querySelector(".places__subtitle").textContent;
        imageTitle.textContent = this._textImage;
        openPopup(popupOpen);
    }

    /*-----удаление карточки-----*/
    _handleDeleteButton(event) {
        const deleteCard = event.target.closest(".places__item");
        deleteCard.remove();
    }

    /*-----лайк карточки-----*/
    _handleLikeButton(event) {
        const likeButton = event.target;
        likeButton.classList.toggle("places__like-logo_active");
    }
}
