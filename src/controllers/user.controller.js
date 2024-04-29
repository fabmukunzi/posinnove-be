import { generateToken } from "../utils/token.generator";
import { hashPassword, comparePassword } from "../utils/password.utils";
import { UserService } from "../services/user.service";
import sendEmail from "../utils/sendMail";

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
    sendEmail({
      to:email,
      subject:"Posinnove Verification",
      body:`localhost:5000/users/verify-email?token=${token}`
    })
    res.status(201).json({
      message: "User created successfully",
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
      message: "Successfully logged in",
      data: { token },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Something went wrong, Try again",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json({
      message: "Users fetched successfully",
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
        status: "fail",
        message: "User not found",
      });
    }
    const createUserDataResponse = (user) => ({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      gender: user.gender,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      active: user.active,
    });
    const responseData = createUserDataResponse(user);
    res.status(200).json({
      message: "User fetched successfully",
      data: responseData,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
export const changeAccountStatus = async (req, res) => {
  const { id } = req.params;
  const { reasonDeactivated } = req.body;

  try {
    const user = await UserService.getUserById(id);
    user.active = !user.active;
    user.reasonDeactivated = reasonDeactivated;
    await user.save();

    let emailSubject;
    let activationReason;
    if (user.active) {
      emailSubject = "Account Enabled";
      activationReason = "You are allowed to login again";
    } else {
      emailSubject = "Account Disabled";
      activationReason = reasonDeactivated;
    }

    const emailBody = `
      <p>User account with this email ${user.email} has been ${
      user.active ? "enabled" : "disabled"
    }.</p>
      <p>Reason: ${activationReason}</p>
    `;
    await sendEmail({
      to: user.email,
      subject: emailSubject,
      body: emailBody,
    });

    res.status(200).json({
      status: "success",
      message: user.active
        ? "User account successfully enabled"
        : "User account successfully disabled",
      reasonDeactivated: user.reasonDeactivated,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
