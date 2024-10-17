import express from "express";
import { protectRoute, restrictTo } from "../middlewares/auth.middleware";
import { createNewEnrollment, deleteEnrollment, getAllEnrollments, getSingleEnrollment } from "../controllers/enrollments.controller";


const EnrollmentRoutes = express.Router();

EnrollmentRoutes.post('/', protectRoute, createNewEnrollment);
EnrollmentRoutes.get('/', protectRoute, restrictTo('admin', 'instructor'), getAllEnrollments);
EnrollmentRoutes.get('/:id', protectRoute, getSingleEnrollment);
EnrollmentRoutes.delete('/:id', protectRoute, deleteEnrollment);

export default EnrollmentRoutes;