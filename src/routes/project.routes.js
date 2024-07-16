import express from 'express';
import {createProject , getOneProject,getAllProjects,deleteProject } from "../controllers/project.controller"
import { protectRoute } from '../middlewares/auth.middleware';
import {checkProjectExists} from '../middlewares/checkProjectExists'
// import { validateProject} from "../validations/project.validation"
const projectRoutes = express.Router();


projectRoutes.post('/',protectRoute, createProject);

projectRoutes.get('/',protectRoute, getAllProjects);

projectRoutes.get('/:id',checkProjectExists,protectRoute, getOneProject);

projectRoutes.delete('/:id',checkProjectExists,protectRoute, deleteProject);

export default projectRoutes;