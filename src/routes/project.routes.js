import express from 'express';
import {createProject , getOneProject, getAllProjects, deleteProject, getProjectsByCategory, updateProject } from "../controllers/project.controller"
import { protectRoute } from '../middlewares/auth.middleware';
import {checkProjectExists} from '../middlewares/checkProjectExists'
import { checkEnrollmentStatus } from '../middlewares/userenrollment.middleware';
import { restrictTo } from '../middlewares/auth.middleware';

const projectRoutes = express.Router();

projectRoutes.post('/',protectRoute,restrictTo('admin','instructor'), createProject);

projectRoutes.get('/', getAllProjects);

projectRoutes.get('/:id',checkProjectExists, protectRoute, checkEnrollmentStatus, getOneProject);

projectRoutes.delete('/:id',checkProjectExists,protectRoute,restrictTo('admin','instructor'), deleteProject);

projectRoutes.get('/projects/:projectCategoryId', protectRoute, getProjectsByCategory);

projectRoutes.patch('/:id', protectRoute,restrictTo('admin','instructor'), checkProjectExists, updateProject);

export default projectRoutes;