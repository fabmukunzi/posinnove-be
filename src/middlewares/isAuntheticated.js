import jwt from 'jsonwebtoken';
import User from "../database/models/user.model";

const checkAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);

    if (user) {
    
      req.user = user;
      next();
    } else {
      return res.status(400).json({
        status: "fail",
        message: "You have to login first",
      });
    }
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      message: "Invalid token",
    });
  }
};

export default checkAuthenticated;