export default class UsersDTO {
    constructor(user) {
        this._id = user._id;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.status = user.status;
        this.role = user.role;
    }
}