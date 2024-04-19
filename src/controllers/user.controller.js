import User from "../database/models/user.model";
import { generateToken } from "../utils/token.generator";
import { hashPassword, comparePassword } from "../utils/password.utils";
import { v4 as uuidv4 } from 'uuid';

export const userSignup = async (req, res) => {
  const { firstName, lastName, password, email, gender, role } = req.body;
  try {
    const user = await User.create({
      firstName,
      lastName,
      password,
      email,
      gender,
      role,
    });

    const token = generateToken(user);
    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: { token },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Error creating user: " + error.message,
    });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid credentials",
      });
    }
    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid credentials",
      });
    }
    const token = generateToken(user);
    res.status(200).json({
      status: "success",
      message: "Successfully logged in",
      data: { token },
    });
  } catch (error) {
    console.error("Error occurred during user login:", error);
    res.status(500).json({
      status: "fail",
      message: "Error logging in" + error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    //password token
const generateResetPasswordToken = () => {
    const token = uuidv4();
    return token;
  };


//password token expiry time
const calculateResetPasswordTokenExpiry = () => {
    const moment = require('moment');
    const expiryTime = moment().add(1, 'hour');
    return expiryTime;
  };

    const resetPasswordToken = generateResetPasswordToken();
    const resetPasswordTokenExpires = calculateResetPasswordTokenExpiry();

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordTokenExpires = resetPasswordTokenExpires;
    await user.save();

    // Send rest password email
    
    sendResetPasswordInstructions(user.email, resetPasswordToken);

    res.status(200).json({
      status: "success",
      message: "Reset password instructions sent successfully",
    });
  } catch (error) {
    console.error("Error occurred during forgot password:", error);
    res.status(500).json({
      status: "fail",
      message: "Error sending reset password instructions: " + error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordTokenExpires: { [Sequelize.Op.gte]: new Date() },
      },
    });
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid or expired reset password token",
      });
    }
    // Update password with the new one
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordTokenExpires = null;
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Error occurred during password reset:", error);
    res.status(500).json({
      status: "fail",
      message: "Error resetting password: " + error.message,
    });
  }
};




