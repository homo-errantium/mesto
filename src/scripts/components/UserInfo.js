export default class UserInfo {
    constructor(userNameProfileEdit, userInfoProfileEdit) {
        this._name = userNameProfileEdit;
        this._about = userInfoProfileEdit;
    }
    getUserInfo() {
        const info = {
            name: this._name.textContent,
            about: this._about.textContent,
        };
        return info;
    }
    setUserInfo(data) {
        if (data.name) this._name.textContent = data.name;
        if (data.about) this._about.textContent = data.about;
    }
}
