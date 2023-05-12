export default class Card {
    constructor({
        data,
        userId,
        cardTemplateSelector,
        handleCardClick,
        handleLikeButton,
        handleDeleteButton,
    }) {
        this._currentUserId = userId;
        this._dataOwnerId = data.owner._id;
        this._imageLink = data.link;
        this._imageName = data.name;
        this._name = data.name;
        this._likes = data.likes;
        this._cardId = data._id;
        this._cardTemplateSelector = cardTemplateSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeButton = handleLikeButton;
        this._handleDeleteButton = handleDeleteButton;
    }

    _getTemplateElement() {
        return document
            .querySelector(this._cardTemplateSelector)
            .content.querySelector(".element")
            .cloneNode(true);
    }

    _setEventListeners() {
        if (this._currentUserId === this._dataOwnerId) {
            this._cardElement
                .querySelector(".element__btn-trash")
                .addEventListener("click", (evt) => {
                    this._handleDeleteButton(evt);
                });
        }
        this._likeButton.addEventListener("click", (evt) =>
            this._handleLikeButton(evt)
        );
        this._cardsElementImage.addEventListener("click", () =>
            this._handleCardClick()
        );
    }

    generateCard() {
        this._cardElement = this._getTemplateElement();
        this._likeButton =
            this._cardElement.querySelector(".element__btn-like");
        this._countLikeElement = this._cardElement.querySelector(
            ".element__like-count"
        );
        this._cardsElementImage =
            this._cardElement.querySelector(".element__image");
        if (this._currentUserId !== this._dataOwnerId) {
            this._cardElement.querySelector(".element__btn-trash").remove();
        }

        this._cardsElementImage.src = this._imageLink;
        this._cardsElementImage.alt = this._imageName;

        this._cardElement.querySelector(".element__caption").textContent =
            this._name;
        this._countLikeElement.textContent = this._likes.length;

        this._toggleLikeState();
        this._setEventListeners();

        return this._cardElement;
    }

    _toggleLikeState() {
        if (this._checkUserLike()) {
            this.setLike();
        } else {
            this.unsetLike();
        }
    }

    setLike() {
        this._likeButton.classList.add("element__btn-like_active");
        this.isLiked = true;
    }

    unsetLike() {
        this._likeButton.classList.remove("element__btn-like_active");
        this.isLiked = false;
    }

    setLikesCounter(data) {
        this._countLikeElement.textContent = data.length;
        if (this._checkUserLike()) {
            this.setLike();
        }
    }

    _checkUserLike() {
        return this._likes.some((item) => item._id === this._currentUserId);
    }

    getCardId() {
        return this._cardId;
    }
}
