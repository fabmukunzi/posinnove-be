import { userSignup, userLogin, getAllUsers, singleUser, forgotPassword, resetPassword } from "../controllers/user.controller";
import express from "express";
import validateUser from "../validations/user.validation";
const userRoutes = express.Router();

//middlewares
import checkUserExistence from "../middlewares/isExistingUser";

userRoutes.post("/signup", checkUserExistence, validateUser, userSignup);
userRoutes.post("/login", userLogin);
userRoutes.get("/", getAllUsers);
userRoutes.get("/:id", singleUser);

//password forget and reset routes
userRoutes.post("/forgot-password", forgotPassword);
userRoutes.post("/reset-password/:token", resetPassword);

export default userRoutes;