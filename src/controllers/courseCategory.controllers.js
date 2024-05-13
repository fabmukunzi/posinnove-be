
import { CourseCategoryService } from '../services/courseCategory.service';

export const createCourseCategory = async (req, res) => {
    const { courseCategory, description } = req.body;
    try {
        const newCourseCategory ={
            courseCategory,
            description
        };
        const createdCourseCategory = await CourseCategoryService.createCourseCategory(newCourseCategory);
        res.status(201).json({
            status: "success",
            message: "Course category created successfully",
            data: {
               
                courseCategory: createdCourseCategory,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: error.message
        });
    }
};

export const getCourseCategories = async (req,res) => {
  try{
    const allCategories = await CourseCategoryService.getCourseCategories()
    res.status(200).json({
        status: "success",
        message: "Course categories retrieved successfully",
        data: {
           
            courseCategories: allCategories,
        },
    });
  }
  catch(error) {
    res.status(500).json({
        status: "error",
        message: "Internal server error",
        error: error.message
    });
  }

}

export const getCourseCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const courseCategory = await CourseCategoryService.getCourseCategoryById(id);
        res.status(200).json({
            status: "success",
            message: "Course category retrieved successfully",
            data: {
               
                courseCategory: courseCategory,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: error.message
        });
    }
}

export const updateCourseCategory = async (req, res) => {
    const {id} = req.params;
    const { courseCategory, description } = req.body;
    try{
        const updatedCategory = {
            courseCategory,
            description
        }
        
        const updatedCourseCategory = await CourseCategoryService.updateCourseCategory(id, updatedCategory);
       
        res.status(200).json({
            status: "success",
            message: "Course category updated successfully",
            data: {
                
                courseCategory: updatedCourseCategory,
            },
        });

    }
    catch(error) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: error.message
        });
    }

}

export const deleteCourseCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCategory = await CourseCategoryService.deleteCourseCategory(id);
        res.status(200).json({
            status: "success",
            message: "Course category deleted successfully",
            
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: error.message
        });
    }
}
