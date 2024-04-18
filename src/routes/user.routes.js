import {
  userSignup,
  userLogin,
  getAllUsers,
  singleUser,
} from '../controllers/user.controller';
import express from 'express';
import validateUser from '../validations/user.validation';
import { protectRoute, restrictTo } from '../middlewares/auth.middleware';
import checkUserExistenceByEmail, { CheckLoginPassword, checkIfUserExistById } from '../middlewares/user.middleware';

const userRoutes = express.Router();

userRoutes.post('/signup',validateUser, checkUserExistenceByEmail,  userSignup);
userRoutes.post('/login', checkUserExistenceByEmail,CheckLoginPassword, userLogin);
userRoutes.get('/', protectRoute, restrictTo('admin','teacher'), getAllUsers);
userRoutes.get('/:id',checkIfUserExistById, singleUser);

export default userRoutes;
