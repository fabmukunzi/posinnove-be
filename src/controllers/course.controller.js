import createMulterInstance from '../helpers/multer';
import Course from '../database/models/course.model';
import {uploadImage,deleteImage} from '../helpers/cloudinary';
import {courseService} from '../services/course.service';
const multer = createMulterInstance('course_thumbnails');

const uploadSingleImage = multer.single('courseThumbnail');

export const createCourse = async (req, res) => {
  uploadSingleImage(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    const loggedUser = req.user
    const teacherId = loggedUser.id;
    try {
      const { title, description, categoryId } = req.body;
      const imageUrl = await uploadImage(req.file.path, 'course_thumbnails');

      const course = await Course.create({
        tutorId:teacherId,
        title,
        description,
        courseThumbnail: imageUrl,
        categoryId
      });

      res.status(201).json(course);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
 export  const getAllCourse = async (req,res) => {
    const loggedUser = req.user
    const tutorId = loggedUser.id;
    console.log(tutorId);
    try{
        const courses = await courseService.getCourses(tutorId);
        res.status(200).
        json({
            status: "success",
            message: "Courses retrieved successfully",
            data: {
               
                courses: courses,
            },
        });
    }
    catch (error) {
        res.status(500).json({ 
            status: "error",
            message: "Internal server error",
            error: error.message 
        });
    }
 };

 export const getSingleCourse =async (req, res) => {
    const {id} = req.params;
    const loggedUser = req.user
    const tutorId = loggedUser.id;
    try{
        const course = await courseService.getCourseById(id,tutorId);
        res.status(200).
        json({
            status: "success",
            message: "Course retrieved successfully",
            data: {
               
                course: course,
            },
        });
    }
    catch (error) {
        res.status(500).json({ 
            status: "error",
            message: "Internal server error",
            error: error.message 
        });
    }

 };
 export const deleteCourse =async (req, res) =>{
    const {id} = req.params
    const loggedUser = req.user
    const tutorId = loggedUser.id;

    try{
        
await courseService.deleteCourse(id,tutorId);
        res.status(200).json({
            status: "success",
          
            data: {
                message: "Course deleted successfully",   
            },
        });

    }
    catch(error) {
        res.status(500).json({ 
            status: "error",
            message: "Internal server error",
            error: error.message 
        });
    };
 }
 export const updateExistingCourse = async (req, res, next) => {
    uploadSingleImage(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

    const { id } = req.params;
    const loggedUser = req.user;
    const tutorId = loggedUser.id;
    const { title, description, categoryId } = req.body;
   
        try {
            const updatedCourseData = {
                title,
                description,
                categoryId,
            };
            if (req.file) {
                const imageUrl = await uploadImage(req.file.path, 'course_thumbnails');
                updatedCourseData.courseThumbnail = imageUrl;
            }

            const updatedCourse = await courseService.updateCourse(id, tutorId, updatedCourseData);
            res.status(200).json({
                status: "success",
                message: "Course updated successfully",
                data: {
                    course: updatedCourse,
                },
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: "Internal server error",
                error: error.message,
            });
        }
    });
};


