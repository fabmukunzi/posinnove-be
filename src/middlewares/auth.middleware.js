import jwt from 'jsonwebtoken';
import { UserService } from '../services/user.service';
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
      async (err, user) => {
        if (err)
          return res.status(401).json({
            message: 'Unauthorized request, try again',
          });
        else {
          req.user = user;
          next();
        }
      }
    );
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: error?.message,
    });
  }
};

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'You are not allowed to perform this task',
      });
    }
    next();
  };
};
export const isUserActive = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await UserService.getUserByEmail(email);
    if (!user.active) {
      return res.status(403).json({
        status: 'fail',
        message: 'Your account has been deactivated. Please contact the administrator.',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
