import { generateToken } from "../utils/token.generator";
import { hashPassword } from "../utils/password.utils";
import { UserService } from "../services/user.service";
import User from "../database/models/user.model"
import sendEmail from "../utils/sendMail";
import jwt from 'jsonwebtoken';
import { retryUpload } from '../helpers/retryUpload';
import fs from 'fs';
import { updateProfileSchema } from '../validations/user.updateProfile.validation';


export const userSignup = async (req, res) => {
  const { firstName, lastName, password, email, gender, role, provider } = req.body;
  let hashedPassword = null;
  if (!provider || !['google', 'facebook', 'twitter'].includes(provider.toLowerCase())) {
    hashedPassword = await hashPassword(password);
  }

  try {
    const user = {
      firstName,
      lastName,
      password: hashedPassword,
      email,
      gender,
      role,
      provider,
    };
    const createdUser = await UserService.register(user);
    const token = generateToken({ id: createdUser.id, email: createdUser.email });
    await sendEmail({
      to: email,
      subject: "Posinnove Verification",
      body: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .verification-link {
                color: #007bff;
                text-decoration: none;
              }
              .verification-link:hover {
                text-decoration: underline;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>Posinnove Account Verification</h2>
              <p>Dear ${firstName} ${lastName},</p>
              <p>Please click the following link to verify your Posinnove account:</p>
              <p><a class="verification-link" href=${process.env.baseURL}/api/users/verify-email/${token}>Verify Email</a></p>
              <p>If you didn't create an account with Posinnove, you can safely ignore this email.</p>
            </div>
          </body>
        </html>
      `,
    });
    res.status(201).json({
      message: "User created successfully, check your email to verify Account",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyAccount = async (req, res) => {
  try {
    const token = req.params.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { id: userId, email } = decodedToken;
    
    const user = await User.findOne({
      where: { id: userId, email: email },
    });

    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "User not found",
      });
    }

    if (user.verified) {
      return res.status(200).json({
        status: "success",
        message: "Account already verified. Please login to continue",
      });
    }

    await user.update({ verified: true });

    return res.status(200).json({
      status: "success",
      message: "Account verified. Please login to continue",
    });

  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid token",
        error: error.message,
      });
    }
    
    return res.status(500).json({
      status: "error",
      message: "An unexpected error occurred",
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

export const getProfile = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.user.id)
    res.status(200).json({
      message: "Profile fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
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
    await user.save();F

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


export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        status: "fail",
        message: "Please enter your email"
      });
    }

    const user = await UserService.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found"
      });
    }
    const resetToken = generateToken(user,'10min');
    sendEmail({
      to: email,
      subject: "Posinnove ResetPassword",
      body: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .verification-link {
                color: #007bff;
                text-decoration: none;
              }
              .verification-link:hover {
                text-decoration: underline;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>Posinnove Account Verification</h2>
              <p>Please click the following link to verify your Posinnove account:</p>
              <p><a class="verification-link" href=${process.env.baseURL}/api/users/resetPassword/${resetToken}>Verify Email</a></p>
              <p>If you didn't create an account with Posinnove, you can safely ignore this email.</p>
            </div>
          </body>
        </html>
      `,
    });
    res.status(200).json({
      status: "success",
      message: " sent successfully"
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message || "Internal Server Error"
    });
  }
};

export const resetPassword=async(req, res) => {
  const token = req.params.token;
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.id;

  const user = await User.findOne({
    where: { id: userId},
  });
  console.log(userId);
  console.log('=======================');
  if(!user){
    return res.status(404).json({
      status: "fail",
      message: "Inavlid or expired token"
    });
  }
  const { password } = req.body;
   const hashedPassword=await hashPassword(password)

  user.password=hashedPassword;
  await user.save();

  return res.status(200).json({
    status: "success",
    message: "Password reset successfully"
  });
}

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Validate the request body using Joi
    const { error, value: updates } = updateProfileSchema.validate(req.body, { abortEarly: false });

    if (error && !req.file) {
      return res.status(400).json({
        status: 'fail',
        message: 'Validation error',
        errors: error.details,
      });
    }

    const user = await UserService.getUserById(userId);

    // Handle profile image upload
    if (req.file) {
      const filePath = req.file.path;
      const folder = 'profileImages';
      try {
        const profileImageUrl = await retryUpload(filePath, folder);
        updates.profileImage = profileImageUrl;

        // Remove the file from the local server
        fs.unlinkSync(filePath);
      } catch (error) {
        console.error('Error uploading file to Cloudinary:', error);
        return res.status(500).json({
          status: 'error',
          message: 'Error uploading profile image',
        });
      }
    }

    //hashing password if updated
    if (updates.password) {
      updates.password = await hashPassword(updates.password);
    }

    // Update user fields with the new values
    await User.update(updates, { where: { id: userId } });

    // fields needed in response
    const responseData = await User.findOne({
      where: { id: userId },
      attributes: {
        exclude: ['password'],
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'Profile updated successfully',
      data: responseData,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Internal Server Error',
    });
  }
};