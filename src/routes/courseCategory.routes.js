import express from 'express';
import {createCourseCategory,updateCourseCategory,getCourseCategoryById,getCourseCategories,deleteCourseCategory} from "../controllers/courseCategory.controllers"

const courseCategoryRoutes = express.Router();

courseCategoryRoutes.post('/', createCourseCategory);
courseCategoryRoutes.patch('/:id', updateCourseCategory); 
courseCategoryRoutes.get('/:id', getCourseCategoryById); 
courseCategoryRoutes.get('/', getCourseCategories);
courseCategoryRoutes.delete('/:id', deleteCourseCategory);


export default courseCategoryRoutes;