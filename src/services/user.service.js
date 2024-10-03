import User from "../database/models/user.model";

export class UserService {
  static async register(user) {
    return await User.create(user);
  }

  static async getUserById(id) {
    return await User.findOne({ where: { id: id }, attributes: { exclude: ['password'] } });
  }

  static async getUserByUserName(username) {
    return await User.findOne({ where: { username: username }, attributes: { exclude: ['password'] } });
  }

  static async getUserByEmail(email) {
    return await User.findOne({ where: { email: email } });
  }

  static async getUserByResetToken(resetToken) {
    return await User.findOne({ where: { resetToken: resetToken } });
  }

  static async updateUser(id, updates) {
    return await User.update(updates, { where: { id: id } });
  }

  static async getAllUsers() {
    return await User.findAll({ attributes: { exclude: ['password'] } });
  }
}
