import {
  userSignup,
  userLogin,
  getAllUsers,
  singleUser,
  changeAccountStatus,
  forgetPassword,
  resetPassword,
  getUserProfile,
  changePassword,
  updateUserProfile
} from '../controllers/user.controller';
import express from 'express';
import validateUser from '../validations/user.validation';
import { protectRoute, restrictTo,isUserActive,isVerified } from '../middlewares/auth.middleware';
import checkUserExistenceByEmail, { CheckLoginPassword, CheckOldPassword, checkIfUserExistById } from '../middlewares/user.middleware';
import validateAccountStatusUpdate from '../validations/disableAccount.validation';
import { verifyAccount } from '../controllers/user.controller';


const userRoutes = express.Router();
userRoutes.get('/verify-email/:token', verifyAccount);
userRoutes.post('/signup',validateUser, checkUserExistenceByEmail,  userSignup);
userRoutes.post('/login', checkUserExistenceByEmail,CheckLoginPassword,isUserActive, userLogin);
userRoutes.post('/forgetpassword',forgetPassword)
userRoutes.patch('/resetpassword/:token',resetPassword)
userRoutes.get('/', protectRoute, restrictTo('admin'), getAllUsers);
userRoutes.get('/profile', protectRoute, getUserProfile);
userRoutes.patch('/profile/changepassword', protectRoute,CheckOldPassword, changePassword);
userRoutes.patch('/profile/updateprofile', protectRoute, updateUserProfile);
userRoutes.post('/login', checkUserExistenceByEmail,CheckLoginPassword,isUserActive,isVerified,userLogin);
userRoutes.get('/', protectRoute, restrictTo('admin','teacher'), getAllUsers);
userRoutes.get('/:id',checkIfUserExistById, singleUser);
userRoutes.patch('/:id/status', protectRoute, restrictTo('admin'),validateAccountStatusUpdate, changeAccountStatus);

export default userRoutes;