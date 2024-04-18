import { userSignup,userLogin,getAllUsers,singleUser } from "../controllers/user.controller";
import express from "express";
import validateUser from "../validations/user.validation"
const userRoutes = express.Router();

//middlewares
import checkUserExistence from "../middlewares/isExistingUser";



userRoutes.post("/signup",checkUserExistence,validateUser, userSignup);
userRoutes.post("/login", userLogin);
userRoutes.get("/",getAllUsers);
userRoutes.get("/:id",singleUser);

export default userRoutes;

