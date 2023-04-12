import { openPopup } from "./utils.js";
import { openImageClick } from "./utils.js";
import { popupOpenVieweImage } from "./constants.js";

export class Card {
    constructor(data, selectors) {
        this._title = data.name;
        this._image = data.link;
        this._cardTemplate = selectors.cardTemplateId;
    }

    /*-----взятие разметки из html-----*/
    _getTemplate() {
        const cardElement = document
            .getElementById(this._cardTemplate)
            .content.querySelector(".places__item")
            .cloneNode(true);
        return cardElement;
    }

    /*-----создание карточки-----*/
    generateCard() {
        this._newCard = this._getTemplate();
        this._newCardImage = this._newCard.querySelector(".places__image");
        this._setEventListeners();
        this._newCardImage.setAttribute("src", this._image);
        this._newCardImage.setAttribute("alt", `фото: ${this._title}`);
        this._newCard.querySelector(".places__subtitle").textContent =
            this._title;
        return this._newCard;
    }

    /*-----навешивание  слушателей-----*/
    _setEventListeners() {
        this._likeButton = this._newCard.querySelector(".places__like-logo");
        this._likeButton.addEventListener("click", () => {
            this._likeButton.classList.toggle("places__like-logo_active");
        });

        this._deleteButton = this._newCard.querySelector(
            ".places__delete-button"
        );
        this._deleteButton.addEventListener("click", () => {
            this._newCard.remove();
        });

        this._newCardImage.addEventListener("click", this._handleImageClick);
    }

    /*-----открытие режима просмотра-----*/
    _handleImageClick(event) {
        openImageClick(event);
        this._popupOpenVieweImage = popupOpenVieweImage;
        openPopup(this._popupOpenVieweImage);
    }
}
