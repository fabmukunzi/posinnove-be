import express from 'express';
import session from 'express-session';
import passport from './googleAuth/passport.google';  // Import the passport configuration
import userRoutes from './routes/user.routes';
import projectRoutes from './routes/project.routes';
import projectCategory from './routes/projectCategory.routes';
import docs from './documentation';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Welcome to Posinnove Backend APIs' });
});

app.use('/api/users', userRoutes);
app.use('/api/categories', projectCategory);
app.use("/api/projects", projectRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(docs));

// Google OAuth routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to the client or another page.
    res.redirect('/profile');
  }
);

// Profile route (for demonstration purposes)
app.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ user: req.user });
    } else {
        res.redirect('/');
    }
});

export default app;
