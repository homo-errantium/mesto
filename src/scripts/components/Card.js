export default class Card {
    constructor({ data, selectors }, handleCardClick) {
        this._title = data.name;
        this._image = data.link;
        this._cardTemplate = selectors.cardTemplateId;
        this._handleCardClick = handleCardClick;
        this._placesItem = selectors.placesItemSelector;
        this._placesImage = selectors.placesImageSelector;
        this._placesSubtitle = selectors.placesSubtitleSelector;
        this._placesLikeLogo = selectors.placesLikeLogoSelector;
        this._placesLikeLogoActive = selectors.placesLikeLogoActiveClass;
        this._placesDeleteButton = selectors.placesDeleteButtonSelector;
    }

    /*-----взятие разметки из html-----*/
    _getTemplate() {
        const cardElement = document
            .getElementById(this._cardTemplate)
            .content.querySelector(this._placesItem)
            .cloneNode(true);
        return cardElement;
    }

    /*-----создание карточки-----*/
    generateCard() {
        this._newCard = this._getTemplate();
        this._newCardImage = this._newCard.querySelector(this._placesImage);
        this._setEventListeners();
        this._newCardImage.setAttribute("src", this._image);
        this._newCardImage.setAttribute("alt", `фото: ${this._title}`);
        this._newCard.querySelector(this._placesSubtitle).textContent =
            this._title;
        return this._newCard;
    }

    _toggleLike() {
        this._likeButton.classList.toggle(this._placesLikeLogoActive);
    }

    _deleteCard() {
        this._newCard.remove();
    }

    /*-----навешивание  слушателей-----*/
    _setEventListeners() {
        this._newCardImage.addEventListener("click", () => {
            this._handleCardClick(this._title, this._image); //ф-я должна быть принята как аргумент (по заданию)
        });

        this._likeButton = this._newCard.querySelector(this._placesLikeLogo);
        this._likeButton.addEventListener("click", () => {
            this._toggleLike();
        });

        this._deleteButton = this._newCard.querySelector(
            this._placesDeleteButton
        );
        this._deleteButton.addEventListener("click", () => {
            this._deleteCard();
        });
    }
}
