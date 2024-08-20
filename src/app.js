import express from 'express';
import userRoutes from './routes/user.routes';
import morgan from 'morgan';
import cors from 'cors';
import projectRoutes from './routes/project.routes';

import projectCategoryRoutes from './routes/projectCategory.routes';
import docs from './documentation';

// const swaggerDocument = require('./swagger.json');
import swaggerUi from 'swagger-ui-express';

import User from './database/models/user.model.js';
import projectCategory from './database/models/projectCategory.model.js';
import Project from './database/models/project.model.js';
import associateModels from './database/models/associateModels.js';
import Enrollment from './database/models/enrollement.model.js';
import subscribeRoutes from './routes/subscribe.routes.js';


const app = express();
const models = { User, projectCategory, Project,Enrollment };
associateModels(models);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(docs));
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.get('/', (req, res) => { return res.status(200).json({ message: 'welcome to posinnove Backend APIs'});});
app.use('/api/users', userRoutes);
app.use('/api/categories', projectCategoryRoutes);
app.use("/api/projects",projectRoutes)
app.use('/api/subscribe',subscribeRoutes)



export default app;
