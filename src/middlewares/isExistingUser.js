import User from "../database/models/user.model"
const checkUserExistence = async (req, res, next) => {
    const { email } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                status: "fail",
                message: "User already exists. Please login again"
            });
        }
        next();
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "Error checking user existence: " + error.message
        });
    }
};
export  default checkUserExistence;



