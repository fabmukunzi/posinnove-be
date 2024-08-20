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

import User from './database/models/user.model.js';
import projectCategory from './database/models/projectCategory.model.js';
import Project from './database/models/project.model.js';
import associateModels from './database/models/associateModels.js';
import Enrollment from './database/models/enrollement.model.js';
import subscribeRoutes from './routes/subscribe.routes.js';
dotenv.config();


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

const app = express();
const models = { User, projectCategory, Project,Enrollment };
associateModels(models);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(docs));
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Welcome to Posinnove Backend APIs' });
});

app.use('/api/users', userRoutes);
app.use('/api/categories', projectCategoryRoutes);
app.use("/api/projects",projectRoutes)
app.use('/api/subscribe',subscribeRoutes)

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
