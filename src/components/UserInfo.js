export default class UserInfo {
    constructor(selectors) {
        this._profileNameElement = document.querySelector(
            selectors.profileNameSelector
        );
        this._profileDescriptionElement = document.querySelector(
            selectors.profileAboutSelector
        );
        this._profileAvatarElement = document.querySelector(
            selectors.profileAvatarSelector
        );
    }

    getUserInfo() {
        return {
            userName: this._profileNameElement.textContent,
            userAbout: this._profileDescriptionElement.textContent,
        };
    }

    setUserInfo({ userName, userAbout }) {
        this._profileNameElement.textContent = userName;
        this._profileDescriptionElement.textContent = userAbout;
    }

    setUserAvatar({ userAvatarLink }) {
        this._profileAvatarElement.src = userAvatarLink;
    }

    saveUserId(userId) {
        this._userId = userId;
    }

    getUserId() {
        return this._userId;
    }
}
