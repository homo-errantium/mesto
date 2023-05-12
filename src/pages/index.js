import "./index.css";
import {
    selectors,
    profileAvatarEditButton,
    profileEditButton,
    addCardButton,
    cardsContainerSelector,
    cardTemplateSelector,
} from "../utils/constants.js";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import UserInfo from "../components/UserInfo.js";

/*создание api*/
const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-65",
    headers: {
        authorization: "a772ee3c-7f9f-4379-9fba-e4883f8faf6c",
        "Content-Type": "application/json",
    },
});

const userInfo = new UserInfo(selectors);

/*получение данных с сервера*/
api.getServerData()
    .then((responses) => {
        const [cardData, userData] = responses;
        userInfo.setUserInfo({
            userName: userData.name,
            userAbout: userData.about,
        });
        userInfo.setUserAvatar({ userAvatarLink: userData.avatar });
        cards.renderItems(cardData);
        userInfo.saveUserId(userData._id);
    })
    .catch((err) => {
        console.error(err);
    });

/*создание секции для карточки*/
const cards = new Section(
    {
        renderer: (item) => {
            const cardElement = createNewCard(item, cardTemplateSelector);
            cards.addOldItem(cardElement);
        },
    },
    cardsContainerSelector
);

/*создание новой карточки*/
function createNewCard(item, cardTemplateSelector) {
    const card = new Card({
        data: item,
        cardTemplateSelector,
        userId: userInfo.getUserId(),
        handleCardClick: () => {
            popupViewer.open(item.link, item.name);
        },
        handleLikeButton: () => {
            if (card.isLiked) {
                api.deleteCardLike(card.getCardId())
                    .then((data) => {
                        card.unsetLike();
                        card.setLikesCounter(data.likes);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            } else {
                api.addCardLike(card.getCardId())
                    .then((data) => {
                        card.setLike();
                        card.setLikesCounter(data.likes);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        },
        handleDeleteButton: (evt) => {
            const cardElement = evt.target.closest(".element");
            const cardId = card.getCardId();
            popupConfirm.changeHandlerSubmitForm((evt) => {
                evt.preventDefault();
                api.deleteCard(cardId)
                    .then(() => {
                        cardElement.remove();
                        popupConfirm.close();
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            });
            popupConfirm.open();
        },
    });
    return card.generateCard();
}

/*попап добавления карточки*/
const popupAddCard = new PopupWithForm(
    selectors.popupAddcardTemplateSelector,
    (evt) => {
        evt.preventDefault();
        popupAddCard.isLoadingMessage(true);
        const formValues = popupAddCard.getFormValues();
        const item = { name: formValues.name, link: formValues.url };
        api.addNewCard(item)
            .then((newCardItem) => {
                const cardElement = createNewCard(
                    newCardItem,
                    cardTemplateSelector
                );
                cards.addNewItem(cardElement);
                popupAddCard.close();
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                popupAddCard.isLoadingMessage(false);
            });
    }
);
popupAddCard.setEventListener();

const popupAddCardValidator = new FormValidator(
    selectors,
    popupAddCard.getFormElement()
);
popupAddCardValidator.enableValidation();

addCardButton.addEventListener("click", () => {
    popupAddCardValidator.resetValidation();
    popupAddCard.open();
});

/*попап смены аватара*/
const popupUpdateAvatar = new PopupWithForm(
    selectors.popupUpdateAvatarSelector,
    (evt) => {
        evt.preventDefault();
        popupUpdateAvatar.isLoadingMessage(true);
        const formValues = popupUpdateAvatar.getFormValues();
        api.setProfileAvatar({ avatar: formValues.url })
            .then((data) => {
                userInfo.setUserAvatar({ userAvatarLink: data.avatar });
                popupUpdateAvatar.close();
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                popupUpdateAvatar.isLoadingMessage(false);
            });
    }
);
popupUpdateAvatar.setEventListener();

const popupUpdateAvatarValidator = new FormValidator(
    selectors,
    popupUpdateAvatar.getFormElement()
);
popupUpdateAvatarValidator.enableValidation();

document
    .querySelector(profileAvatarEditButton)
    .addEventListener("click", () => {
        popupUpdateAvatarValidator.resetValidation();
        popupUpdateAvatar.open();
    });

/*попап редактирования профиля*/
const popupEditProfile = new PopupWithForm(
    selectors.popupEditProfileSelector,
    (evt) => {
        evt.preventDefault();
        popupEditProfile.isLoadingMessage(true);
        const formValues = popupEditProfile.getFormValues();
        api.setUserInfo({ name: formValues.title, about: formValues.subtitle })
            .then((data) => {
                userInfo.setUserInfo({
                    userName: data.name,
                    userAbout: data.about,
                });
                popupEditProfile.close();
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                popupEditProfile.isLoadingMessage(false);
            });
    }
);
popupEditProfile.setEventListener();

profileEditButton.addEventListener("click", () => {
    const userInfoData = userInfo.getUserInfo();
    const profileForm = popupEditProfile.getFormElement();
    profileForm.elements.name.value = userInfoData.userName;
    profileForm.elements.description.value = userInfoData.userAbout;
    popupEditProfileValidator.resetValidation();
    popupEditProfile.open();
});

const popupEditProfileValidator = new FormValidator(
    selectors,
    popupEditProfile.getFormElement()
);
popupEditProfileValidator.enableValidation();

/*попап подтверждения удаления*/
const popupConfirm = new PopupWithConfirm(selectors.popupConfirmSelector);
popupConfirm.setEventListener();

/*попап просмотра изображения*/
const popupViewer = new PopupWithImage(selectors.popupViewerSelector);
popupViewer.setEventListener();
