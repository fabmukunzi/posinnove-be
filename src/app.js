import express from 'express';
<<<<<<< HEAD
import userRoutes from './routes/user.routes';
import morgan from 'morgan';
import cors from 'cors';
=======
import userRoutes from './routes/user.routes'; 
import courseCategoryRoutes from './routes/courseCategory.routes';
import courseRoutes from './routes/course.routes';
>>>>>>> c47de81 (Feat: Implement course creation functionality for tutors)


const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.get('/', (req, res) => {
  return res.status(200).json({ message: 'welcome to posinnove Backend APIs' });
});
app.use('/api/users', userRoutes);
app.use('/api/categories', courseCategoryRoutes);
app.use('/api/course', courseRoutes);


export default app;
