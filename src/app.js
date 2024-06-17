import express from 'express';
import userRoutes from './routes/user.routes';
import morgan from 'morgan';
import cors from 'cors';

import projectCategory from './routes/projectCategory.routes';



const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.get('/', (req, res) => {
  return res.status(200).json({ message: 'welcome to posinnove Backend APIs' });
});
app.use('/api/users', userRoutes);
app.use('/api/categories', projectCategory);



export default app;
