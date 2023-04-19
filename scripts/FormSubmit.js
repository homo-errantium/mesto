export default class SubmitForm {
    constructor({ selector }) {
        this._selector = selector;
    }

    _getElement() {
        const formElement = document
            .querySelector(this._selector)
            .content.querySelector(".form")
            .cloneNode(true);

        return formElement;
    }

    _setEventListeners() {
        // при сабмите формы
        this._element.addEventListener("submit", (evt) => {
            // отменим стандартное поведение
            evt.preventDefault();

            // и сбросим её поля
            this._element.reset();
        });
    }

    generate() {
        this._element = this._getElement(); // создаём элемент
        this._setEventListeners(); // добавляем обработчики

        return this._element; // возвращаем наружу
    }
}
