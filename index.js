let popup = document.querySelector('.popup');
let profile = document.querySelector('.profile');
let redactButton = profile.querySelector('.profile__redact-button');
let closeButton = popup.querySelector('.popup__close');
let saveButton = popup.querySelector('.popup__save-button');
let formPopup = popup.querySelector('.popup__form');
let nameInput = popup.querySelector('.popup__username');
let jobInput = popup.querySelector('.popup__userinfo');
let usernameProfile = profile.querySelector('.profile__title');
let userninfoProfile = profile.querySelector('.profile__subtitle');
let likeLogo = document.querySelector('.places__like-logo');
// let usernamePopup = popup.querySelector('.popup__username');
// let userinfoPopup = popup.querySelector('.popup__userinfo');

// usernamePopup.value = usernameProfile.textContent;
// userinfoPopup.value = userninfoProfile.textContent;

// function savePopup () {
  //   usernameProfile.textContent = usernamePopup.value;
  //   userninfoProfile.textContent = userinfoPopup.value;
  //   closePopup();
  //   }
  
  nameInput.value = usernameProfile.textContent;
  jobInput.value = userninfoProfile.textContent;

function closePopup () {
popup.classList.remove('popup_opened');
}

function openPopup (){
  popup.classList.add('popup_opened');
}

// saveButton.addEventListener('click', savePopup);
redactButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  usernameProfile.textContent = nameInput.value;
  userninfoProfile.textContent = jobInput.value;
  closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formPopup.addEventListener('submit', handleFormSubmit); 

function activeLikeButton() {
  likeLogo.classList.toggle('places__like-logo_active');
  if (likeLogo.classList.contains('places__like-logo_active')===true) {
    likeLogo.setAttribute('src', './images/logo-like-active.svg');
  }
  else {likeLogo.setAttribute('src', './images/logo-like.svg');}
}
likeLogo.addEventListener('click', activeLikeButton);