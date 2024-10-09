import express from "express";
import { protectRoute, restrictTo } from "../middlewares/auth.middleware";
import { createNewEnrollment, deleteEnrollment, getAllEnrollments } from "../controllers/enrollments.controller";


const EnrollmentRoutes = express.Router();

EnrollmentRoutes.post('/', protectRoute, createNewEnrollment);
EnrollmentRoutes.get('/', protectRoute, restrictTo('admin', 'teacher'), getAllEnrollments);
EnrollmentRoutes.delete('/:id', protectRoute, deleteEnrollment);

export default EnrollmentRoutes;