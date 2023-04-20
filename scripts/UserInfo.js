export default class UserInfo {
    constructor({ nameSelector, userInfoSelector }) {
        this._name = document.querySelector(nameSelector);
        this._about = document.querySelector(userInfoSelector);
    }
    getUserInfo() {
        const info = {
            name: this._name.textContent,
            about: this._about.textContent,
        };
        return info;
    }
    setUserInfo(data) {
        this._name.textContent = data.name;
        this._about.textContent = data.about;
    }
}
