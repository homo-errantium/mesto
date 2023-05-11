import "./index.css";
import {
    classData,
    profileAvatarEditButton,
    profileAvatarSelector,
    profileNameSelector,
    profileAboutSelector,
    profileEditButton,
    addCardButton,
    popupEditProfileSelector,
    popupAddCardSelector,
    popupViewerSelector,
    popupConfirmSelector,
    popupUpdateAvatarSelector,
    cardsContainerSelector,
    cardSelector,
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

const userInfo = new UserInfo({
    profileNameSelector,
    profileAboutSelector,
    profileAvatarSelector,
});

/*получение данных с сервера*/
api.getServerData()
    .then((responses) => {
        const [cardData, userData] = responses;
        userInfo.setUserInfo({
            userName: userData.name,
            userDescription: userData.about,
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
            const cardElement = createNewCard(item, cardSelector);
            cards.addItem(cardElement);
        },
    },
    cardsContainerSelector
);

/*создание новой карточки*/
function createNewCard(item, cardSelector) {
    const card = new Card({
        data: item,
        cardSelector,
        userId: userInfo.getUserId(),
        handleCardClick: () => {
            popupViewer.open(item.link, item.name);
        },
        handleLikeButtonClick: () => {
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
        handleRemoveButtonClick: (evt) => {
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
const popupAddCard = new PopupWithForm(popupAddCardSelector, (evt) => {
    evt.preventDefault();
    popupAddCard.isLoadingMessage(true);
    const formValues = popupAddCard.getFormValues();
    const item = { name: formValues.name, link: formValues.url };
    api.addNewCard(item)
        .then((newCardItem) => {
            const cardElement = createNewCard(newCardItem, cardSelector);
            cards.addItem(cardElement);
            popupAddCard.close();
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            popupAddCard.isLoadingMessage(false);
        });
});
popupAddCard.setEventListener();

const popupAddCardValidator = new FormValidator(
    classData,
    popupAddCard.getFormElement()
);
popupAddCardValidator.enableValidation();

addCardButton.addEventListener("click", () => {
    popupAddCardValidator.resetValidation();
    popupAddCard.open();
});

/*попап смены аватара*/
const popupUpdateAvatar = new PopupWithForm(
    popupUpdateAvatarSelector,
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
    classData,
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
const popupEditProfile = new PopupWithForm(popupEditProfileSelector, (evt) => {
    evt.preventDefault();
    popupEditProfile.isLoadingMessage(true);
    const formValues = popupEditProfile.getFormValues();
    api.setUserInfo({ name: formValues.title, about: formValues.subtitle })
        .then((data) => {
            userInfo.setUserInfo({
                userName: data.name,
                userDescription: data.about,
            });
            popupEditProfile.close();
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            popupEditProfile.isLoadingMessage(false);
        });
});
popupEditProfile.setEventListener();

profileEditButton.addEventListener("click", () => {
    const userInfoData = userInfo.getUserInfo();
    const profileForm = popupEditProfile.getFormElement();
    profileForm.elements.name.value = userInfoData.userName;
    profileForm.elements.description.value = userInfoData.userDescription;
    popupEditProfileValidator.resetValidation();
    popupEditProfile.open();
});

const popupEditProfileValidator = new FormValidator(
    classData,
    popupEditProfile.getFormElement()
);
popupEditProfileValidator.enableValidation();

/*попап подтверждения удаления*/
const popupConfirm = new PopupWithConfirm(popupConfirmSelector);
popupConfirm.setEventListener();

/*попап просмотра изображения*/
const popupViewer = new PopupWithImage(popupViewerSelector);
popupViewer.setEventListener();
