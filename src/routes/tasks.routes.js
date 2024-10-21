import express from 'express';
import { protectRoute, restrictTo } from '../middlewares/auth.middleware';
import { createTask, getSingleTask } from '../controllers/tasks.controller';


const TasksRoutes = express.Router();


TasksRoutes.get('/:id', protectRoute, getSingleTask);
TasksRoutes.post('/', protectRoute, restrictTo('admin', 'instructor'), createTask);

export default TasksRoutes;