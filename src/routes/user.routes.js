import {
  userSignup,
  userLogin,
  getAllUsers,
  singleUser,
  changeAccountStatus,
  forgetPassword,
  resetPassword,
  getProfile,
  updateProfile,
  getUserByUsername
} from '../controllers/user.controller';
import express from 'express';
import validateUser from '../validations/user.validation';
import {
  protectRoute,
  restrictTo,
  isUserActive,
  isVerified,
  requirePassword,
} from '../middlewares/auth.middleware';
import checkUserExistenceByEmail, {
  CheckLoginPassword,
  checkIfUserExistById,
} from '../middlewares/user.middleware';
import validateAccountStatusUpdate from '../validations/disableAccount.validation';
import { verifyAccount } from '../controllers/user.controller';
import {uploadMiddleware} from '../middlewares/uploadMiddleware';

const userRoutes = express.Router();
userRoutes.get('/profile', protectRoute, getProfile);
userRoutes.patch('/profile', protectRoute, uploadMiddleware, updateProfile);
userRoutes.get('/verify-email/:token', verifyAccount);
userRoutes.post('/signup', requirePassword, validateUser, checkUserExistenceByEmail, userSignup);
userRoutes.post(
  '/login',
  checkUserExistenceByEmail,
  CheckLoginPassword,
  isUserActive,
  userLogin
);
userRoutes.post('/forgetpassword', forgetPassword);
userRoutes.patch('/resetpassword/:token', resetPassword);
userRoutes.post(
  '/login',
  checkUserExistenceByEmail,
  CheckLoginPassword,
  isUserActive,
  isVerified,
  userLogin
);
userRoutes.get('/', protectRoute, restrictTo('admin', 'mentor'), getAllUsers);
userRoutes.get('/:id', checkIfUserExistById, singleUser);
userRoutes.patch(
  '/:id/status',
  protectRoute,
  restrictTo('admin'),
  validateAccountStatusUpdate,
  changeAccountStatus
);

<<export default userRoutes;
