import Sequelize from 'sequelize';
import User from "../database/models/user.model";
import { generateToken } from "../utils/token.generator";
import { hashPassword, comparePassword } from "../utils/password.utils";

export const userSignup = async (req, res) => {
    const { firstName, lastName, password, email, gender, role } = req.body;
    const hashedPassword = await hashPassword(password);
    try {
        const user = await User.create({
            firstName,
            lastName,
            password: hashedPassword,
            email,
            gender,
            role
        });

        const token = generateToken(user);
        res.status(201).json({
            status: "success",
            message: "User created successfully",
            data: {token } 
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "Error creating user: " + error.message 
        });
    }
};

export const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({
            where: { email }
        });
        if (!user) {
            return res.status(401).json({
                status: "fail",
                message: "Invalid credentials"
            });
        }
        const validPassword = await comparePassword(password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                status: "fail",
                message: "Invalid credentials"
            });
        }
        const token = generateToken(user);
        res.status(200).json({
            status: "success",
            message: "successfully logged in",
            data: { token }
        });
    } catch (error) {
        console.error("Error occurred during user login:", error);
        res.status(500).json({
            status: "fail",
            message: "Error logging in"+error.message
        });
    }
};
const createUserDataResponse = (user) => ({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    gender: user.gender,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
});

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        const responseData = users.map(createUserDataResponse);
        res.status(200).json({
            status: "success",
            message: "Users fetched successfully",
            data: responseData
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
};

export const singleUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "User not found"
            });
        }
        const responseData = createUserDataResponse(user);
        res.status(200).json({
            status: "success",
            message: "User fetched successfully",
            data: responseData
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
};