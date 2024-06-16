import express from 'express';
import {createCourse,getAllCourse,getSingleCourse,deleteCourse,updateExistingCourse} from "../controllers/course.controller"
import { createChapters,getAllCourseChapters,getChapterById,deleteChapter,updateChapter } from '../controllers/chapters.controller';
import { protectRoute, restrictTo} from '../middlewares/auth.middleware';

const courseRoutes = express.Router();
courseRoutes.patch('/:id',protectRoute,restrictTo('admin','teacher'),updateExistingCourse)
courseRoutes.post('/',protectRoute,restrictTo('admin','teacher'),createCourse)
courseRoutes.get('/',protectRoute,restrictTo('admin','teacher'),getAllCourse)
courseRoutes.get('/:id',protectRoute,restrictTo('admin','teacher'),getSingleCourse)
courseRoutes.delete('/:id',protectRoute,restrictTo('admin','teacher'),deleteCourse)
courseRoutes.post('/:courseId/chapters', protectRoute, restrictTo('admin','teacher'), createChapters);
courseRoutes.get('/:courseId/chapters', protectRoute, restrictTo('admin','teacher'), getAllCourseChapters);
courseRoutes.get('/:courseId/chapters/:id', protectRoute, restrictTo('admin','teacher'), getChapterById);
courseRoutes.delete('/:courseId/chapters/:id', protectRoute, restrictTo('admin','teacher'), deleteChapter);
courseRoutes.patch('/:courseId/chapters/:id', protectRoute, restrictTo('admin','teacher'), updateChapter);

   
export default courseRoutes;


