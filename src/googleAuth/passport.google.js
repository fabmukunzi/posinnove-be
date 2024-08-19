import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { UserService } from '../services/user.service';
import { generateToken } from '../utils/token.generator';
import dotenv from 'dotenv';

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await UserService.getUserByEmail(profile.emails[0].value);

      if (!user) {
        user = await UserService.createUser({
          email: profile.emails[0].value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          googleId: profile.id,
          profileImage: profile.photos[0]?.value || null,
          gender: profile.gender || 'Not specified',
          role: 'student',
          active: true,
          verified: true,
          institution: '',
          country: '',
          About: '',
          phone: '',
        });
      } 
      // If the user already exists, skip updating their profile
      // Generate a JWT token if you're using JWT for session management
      const token = generateToken({ id: user.id, email: user.email });

      // Pass the user and token to the done callback
      return done(null, { user, token });
    } catch (error) {
      return done(error, null);
    }
  }
));

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user out of the session
passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
