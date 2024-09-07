import express from 'express';
import {
    createProjectCategory,
    updateProjectCategory,
    getProjectCategoryById,
    getProjectCategories,
    deleteProjectCategory
} from "../controllers/projectCategory.controllers";

const projectCategoryRoutes = express.Router(); 

projectCategoryRoutes.post('/', createProjectCategory); 
projectCategoryRoutes.patch('/:id', updateProjectCategory); 
projectCategoryRoutes.get('/:id', getProjectCategoryById); 
projectCategoryRoutes.get('/', getProjectCategories);
projectCategoryRoutes.delete('/:id', deleteProjectCategory);

export default projectCategoryRoutes;