import {
  userSignup,
  userLogin,
  getAllUsers,
  singleUser,
  changeAccountStatus
} from '../controllers/user.controller';
import express from 'express';
import validateUser from '../validations/user.validation';
import { protectRoute, restrictTo,isUserActive } from '../middlewares/auth.middleware';
import checkUserExistenceByEmail, { CheckLoginPassword, checkIfUserExistById } from '../middlewares/user.middleware';
import validateAccountStatusUpdate from '../validations/disableAccount.validation';

const userRoutes = express.Router();

userRoutes.post('/signup',validateUser, checkUserExistenceByEmail,  userSignup);
userRoutes.post('/login', checkUserExistenceByEmail,CheckLoginPassword,isUserActive, userLogin);
userRoutes.get('/', protectRoute, restrictTo('admin'), getAllUsers);
userRoutes.get('/:id',checkIfUserExistById, singleUser);
userRoutes.patch('/:id/status', protectRoute, restrictTo('admin'),validateAccountStatusUpdate, changeAccountStatus);

export default userRoutes;
