export const selectors = {
    inputSelector: "popup__input",
    buttonSubmitClass: "popup__btn-save",
    disableButtonClass: "popup__btn-save_disabled",
    inputErrorClass: "popup__input_type_error",
    activeErrorClass: "popup__input-error_visible",
    profileAvatarSelector: ".profile__avatar",
    profileAboutSelector: ".profile__about",
    profileNameSelector: ".profile__name",
    popupEditProfileSelector: ".popup_form_edit",
    popupAddcardTemplateSelector: ".popup_form_add",
    popupViewerSelector: ".popup_viewer",
    popupConfirmSelector: ".popup_form_confirm",
    popupUpdateAvatarSelector: ".popup_form_avatar",
};

export const profileAvatarEditButton = ".profile__avatar-edit";
export const profileElement = document.querySelector(".profile");
export const profileEditButton =
    profileElement.querySelector(".profile__btn-edit");
export const addCardButton = profileElement.querySelector(".profile__btn-add");
export const cardsContainerSelector = ".elements__list";
export const cardTemplateSelector = "#card-template";
