import express from 'express';
import { protectRoute, restrictTo } from '../middlewares/auth.middleware';
import { createTask, getAllTasks, getSingleTask } from '../controllers/tasks.controller';


const TasksRoutes = express.Router();


TasksRoutes.get('/', protectRoute, restrictTo('admin', 'instructor'), getAllTasks);
TasksRoutes.get('/:id', protectRoute, getSingleTask);
TasksRoutes.post('/', protectRoute, createTask);

export default TasksRoutes;