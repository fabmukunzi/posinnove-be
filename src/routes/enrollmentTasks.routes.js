import express from 'express';
import {
  protectRoute,
  restrictTo,
} from '../middlewares/auth.middleware';
import {
  createEnrollmentTask,
  deleteEnrollmentTask,
  getAllEnrollmentTasks,
  getTasksByEnrollment,
  startTask,
  submitTask,
  reviewTask,
} from '../controllers/enrollmentTasks.controller';

const EnrollmentTasksRoutes = express.Router();

EnrollmentTasksRoutes.get('/', protectRoute, restrictTo('admin'), getAllEnrollmentTasks);
EnrollmentTasksRoutes.get('/:id', protectRoute, getTasksByEnrollment);
EnrollmentTasksRoutes.post('/', protectRoute, createEnrollmentTask);
EnrollmentTasksRoutes.put('/:id/start', protectRoute, startTask);
EnrollmentTasksRoutes.patch('/:id/submit', protectRoute, submitTask);
EnrollmentTasksRoutes.put('/:id/review', protectRoute, restrictTo('admin', 'tutor'), reviewTask);
EnrollmentTasksRoutes.delete('/:id', protectRoute, deleteEnrollmentTask);

export default EnrollmentTasksRoutes;
