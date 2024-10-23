import express from 'express';
import {
  changeAccountStatus,
  forgetPassword,
  getAllUsers,
  getProfile,
  resetPassword,
  singleUser,
  updateProfile,
  userLogin,
  userSignup,
  verifyAccount
} from '../controllers/user.controller';
import {
  isUserActive,
  isVerified,
  protectRoute,
  requirePassword,
  restrictTo,
} from '../middlewares/auth.middleware';
import { uploadMiddleware } from '../middlewares/uploadMiddleware';
import checkUserExistenceByEmail, {
  CheckLoginPassword,
  checkIfUserExistById,
} from '../middlewares/user.middleware';
import validateAccountStatusUpdate from '../validations/disableAccount.validation';
import validateUser from '../validations/user.validation';

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
userRoutes.get('/', protectRoute, restrictTo('admin', 'instructor'), getAllUsers);
userRoutes.get('/:id', checkIfUserExistById, singleUser);
userRoutes.patch(
  '/:id/status',
  protectRoute,
  restrictTo('admin'),
  validateAccountStatusUpdate,
  changeAccountStatus
);

export default userRoutes;
