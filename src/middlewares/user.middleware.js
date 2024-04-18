import { UserService } from '../services/user.service';
import { comparePassword } from '../utils/password.utils';

const checkUserExistenceByEmail = async (req, res, next) => {
  const { email } = req.body;
  const entry = req.url;
  try {
    const existingUser = await UserService.getUserByEmail(email);
    if (existingUser && entry === '/signup') {
      return res.status(409).json({
        message: 'User already exists. Please login again',
      });
    } else if (!existingUser && entry === '/login') {
      return res.status(401).json({
        message: 'Incorrect email or password',
      });
    }
    req.user = existingUser;
    next();
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong, Try again',
      error: error.message,
    });
  }
};
export default checkUserExistenceByEmail;

export const CheckLoginPassword = async (req, res, next) => {
  const { password } = req.body;
  const user = req.user;
  const isValidPassword = await comparePassword(password, user.password);
  if (!isValidPassword) {
    return res.status(400).json({ message: 'Incorrect email or password' });
  }
  next();
};
export const checkIfUserExistById = async (req, res, next) => {
  const { id } = req.params;
  const user = await UserService.getUserById(id);
  if (!user) {
    return res.status(404).json({ message: 'User does not exist' });
  }
  req.user = user;
  next();
};
