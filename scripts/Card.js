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
        this._element
            .querySelector(".places__image")
            .setAttribute("src", this._image);
        this._element
            .querySelector(".places__image")
            .setAttribute("alt", `фото: ${this._title}`);
        this._element.querySelector(".places__subtitle").textContent =
            this._title;
        return this._element;
    }

    _setEventListeners() {
        this._element
            .querySelector(".places__like-logo")
            .addEventListener("click", () => {
                this._handleLikeButton();
            });
    }

    _handleLikeButton() {
        this._element
            .querySelector(".places__like-logo")
            .classList.toggle("places__like-logo_active");
    }
}

initCards.forEach((item) => {
    // Создадим экземпляр карточки
    const card = new Card(item);
    // Создаём карточку и возвращаем наружу
    const cardElement = card.generateCard();

    // Добавляем в DOM
    document.body.append(cardElement);
});
