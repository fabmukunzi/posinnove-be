import { ProjectCategoryService } from '../services/projectCategory.service';  // Changed from CourseCategoryService to ProjectCategoryService

export const createProjectCategory = async (req, res) => {  
    const { projectCategory, description } = req.body;  
    try {
        const newProjectCategory = {
            projectCategory,
            description
        };
        const createdProjectCategory = await ProjectCategoryService.createProjectCategory(newProjectCategory);  
        res.status(201).json({
            status: "success",
            message: "Project category created successfully",
            data: {
                projectCategory: createdProjectCategory,
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

export const getProjectCategories = async (req, res) => {  
    try {
        const allCategories = await ProjectCategoryService.getProjectCategories();  
        res.status(200).json({
            status: "success",
            message: "Project categories retrieved successfully",
            data: {
                projectCategories: allCategories,  
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

export const getProjectCategoryById = async (req, res) => {  
    const { id } = req.params;
    try {
        const projectCategory = await ProjectCategoryService.getProjectCategoryById(id);  
        res.status(200).json({
            status: "success",
            message: "Project category retrieved successfully",
            data: {
                projectCategory: projectCategory,  
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

export const updateProjectCategory = async (req, res) => {  
    const { id } = req.params;
    const { projectCategory, description } = req.body;  
    try {
        const updatedCategory = {
            projectCategory,
            description
        };
        
        const updatedProjectCategory = await ProjectCategoryService.updateProjectCategory(id, updatedCategory);  
        
        res.status(200).json({
            status: "success",
            message: "Project category updated successfully",
            data: {
                projectCategory: updatedProjectCategory, 
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

export const deleteProjectCategory = async (req, res) => {  
    const { id } = req.params;
    try {
        const deletedCategory = await ProjectCategoryService.deleteProjectCategory(id);  
        res.status(200).json({
            status: "success",
            message: "Project category deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: error.message
        });
    }
};
