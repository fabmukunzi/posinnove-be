import jwt from 'jsonwebtoken';
import { UserService } from '../services/user.service';
import { generateToken } from '../utils/token.generator';
import sendEmail from '../utils/sendMail';
export const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
const token = authHeader ? authHeader.split(' ')[1] : null;
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

export const isVerified = async (req, res,next) => {
  try {
    const { email } = req.body;
    const user = await UserService.getUserByEmail(email);
    if (!user.verified) {
      const token = generateToken({ id: user.id, email: user.email });
      await sendEmail({
        to: email,
        subject: "Posinnove Verification",
        body: `
          <html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                }
                .verification-link {
                  color: #007bff;
                  text-decoration: none;
                }
                .verification-link:hover {
                  text-decoration: underline;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h2>Posinnove Account Verification</h2>
                <p>Dear ${user.firstName} ${user.lastName},</p>
                <p>Please click the following link to verify your Posinnove account:</p>
                <p><a class="verification-link" href=${process.env.baseURL}/api/users/verify-email/${token}>Verify Email</a></p>
                <p>If you didn't create an account with Posinnove, you can safely ignore this email.</p>
              </div>
            </body>
          </html>
        `,
      });
      res.status(403).json({
        status: 'fail',
        message: "Before logging in check your email to verify Account",
      });
     
    }else{
    next();
    }

}
catch (error) {
    res.status(500).json({ 
      status: 'fail',
      error: error.message
     });
  }
}
