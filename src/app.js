import express from 'express';
import session from 'express-session';
import passport from './thirdParties/passport.google.js';  
import userRoutes from './routes/user.routes';
import projectRoutes from './routes/project.routes';
import InterestRoutes from './routes/interest.routes.js'
import projectCategoryRoutes from './routes/projectCategory.routes';
import docs from './documentation';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import subscribeRoutes from './routes/subscribe.routes.js';
import Interest from './database/models/interests.model.js';
import ExpertiseRoutes from './routes/expertise.routes.js'
import Task from './database/models/task.model.js';
import enrollmentTask from './database/models/enrollmentTask.model.js';
import EnrollmentRoutes from './routes/enrollments.routes.js';
import EnrollmentTasksRoutes from './routes/enrollmentTasks.routes.js';
import TasksRoutes from './routes/tasks.routes.js';

import models from './database/models';


dotenv.config();
const app = express();

app.use(session({
    secret: process.env.APISECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

const CSS_URL =
  'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css';

// const models = { User, projectCategory, Project, Enrollment, Interest, Expertise, Task, enrollmentTask };
// associateModels(models);
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(docs, {
    customCss:
      '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
    customCssUrl: CSS_URL,
  })
);
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
app.use('/api/interests',InterestRoutes);
app.use('/api/expertises',ExpertiseRoutes);
app.use('/api/enrollments', EnrollmentRoutes);
app.use('/api/enrollment-tasks', EnrollmentTasksRoutes);
app.use('/api/tasks', TasksRoutes);

// Google OAuth routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {

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
