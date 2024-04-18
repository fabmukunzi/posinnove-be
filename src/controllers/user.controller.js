import { generateToken } from '../utils/token.generator';
import { hashPassword, comparePassword } from '../utils/password.utils';
import { UserService } from '../services/user.service';

export const userSignup = async (req, res) => {
  const { firstName, lastName, password, email, gender, role } = req.body;
  const hashedPassword = await hashPassword(password);
  try {
    const user = {
      firstName,
      lastName,
      password: hashedPassword,
      email,
      gender,
      role,
    };
    await UserService.register(user);
    const token = generateToken(user);
    res.status(201).json({
      message: 'User created successfully',
      data: { token },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const userLogin = async (req, res) => {
  try {
    const user = req.user;
    const token = generateToken(user);
    res.status(200).json({
      message: 'Successfully logged in',
      data: { token },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: 'Something went wrong, Try again',
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json({
      message: 'Users fetched successfully',
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const singleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserService.getUserById(id);
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }
    const responseData = createUserDataResponse(user);
    res.status(200).json({
      message: 'User fetched successfully',
      data: responseData,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
