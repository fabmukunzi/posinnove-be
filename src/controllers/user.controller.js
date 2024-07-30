import { generateToken } from "../utils/token.generator";
import { hashPassword } from "../utils/password.utils";
import { UserService } from "../services/user.service";
import User from "../database/models/user.model"
import sendEmail from "../utils/sendMail";
import jwt from 'jsonwebtoken';
import { retryUpload } from '../helpers/retryUpload';
import fs from 'fs';
import Joi from 'joi';


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
    const userId = decodedToken.id;
    const email = decodedToken.email;
    const user = await User.findOne({
      where: { id: userId, email: email, verified: false },
    });

    if (user && !user.verified) {
      const updatedUser = await user.update({ verified: true });
      if (updatedUser) {
        res.status(201).json({
          status: "success",
          message: "Account verified please login to continue",
        });
      }
    } else {
      res.status(400).json({
        status: "fail",
        message: "Verification failed",
        });
    }
  } catch (error) {
    res.status(400).json({ 
      status: "fail",
      message: "Invalid token" ,
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

//update profile start from here
// Define the validation schema using Joi
const updateProfileSchema = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  username: Joi.string().optional(),
  gender: Joi.string().valid('male', 'female', 'other').optional(),
  institution: Joi.string().optional(),
  country: Joi.string().optional(),
  About: Joi.string().optional(),
  phone: Joi.string().optional(),
  // Ensure at least one field is present
}).or('firstName', 'lastName', 'username', 'gender', 'institution', 'country', 'About', 'phone'); 

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

    // Check if email or password is in the request body
    if (req.body.email || req.body.password) {
      return res.status(400).send({
        error: "It is not possible to update email or password here",
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

    // Update user fields with the new values
    user.firstName = updates.firstName !== undefined ? updates.firstName : user.firstName;
    user.lastName = updates.lastName !== undefined ? updates.lastName : user.lastName;
    user.username = updates.username !== undefined ? updates.username : user.username;
    user.gender = updates.gender !== undefined ? updates.gender : user.gender; 
    user.institution = updates.institution !== undefined ? updates.institution : user.institution;
    user.country = updates.country !== undefined ? updates.country : user.country;
    user.About = updates.About !== undefined ? updates.About : user.About;
    user.phone = updates.phone !== undefined ? updates.phone : user.phone;
    user.profileImage = updates.profileImage !== undefined ? updates.profileImage : user.profileImage;

    await user.save();

    // fields needed in response
    const responseData = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      profileImage: user.profileImage,
      gender: user.gender,
      role: user.role,
      institution: user.institution,
      country: user.country,
      About: user.About,
      phone: user.phone,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      active: user.active,
      verified: user.verified,
    };

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