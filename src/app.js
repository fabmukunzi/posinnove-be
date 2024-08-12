import express from 'express';
import userRoutes from './routes/user.routes';
import morgan from 'morgan';
import cors from 'cors';
import projectRoutes from './routes/project.routes';

import projectCategory from './routes/projectCategory.routes';
import docs from './documentation';

// const swaggerDocument = require('./swagger.json');
import swaggerUi from 'swagger-ui-express';

const CSS_URL =
  'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css';
const app = express();
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
  return res.status(200).json({ message: 'welcome to posinnove Backend APIs' });
});
app.use('/api/users', userRoutes);
app.use('/api/categories', projectCategory);
app.use('/api/projects', projectRoutes);

export default app;
