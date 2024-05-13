import courseCategory from "../database/models/courseCategory.model"

export class CourseCategoryService{
    static async getCourseCategories(){
        return await courseCategory.findAll();
    }
    static async getCourseCategoryById(id){
        return await courseCategory.findOne({where:{id:id}});
    }
    static async createCourseCategory(newCourseCategory){
        return await courseCategory.create(newCourseCategory);
    }
    static async updateCourseCategory(id, updatedCourseCategory) {
        try {
            const [rowsUpdated, [updatedCategory]] = await courseCategory.update(updatedCourseCategory, {
                where: { id: id },
                returning: true, 
            });
    
            if (rowsUpdated === 0) {
                
                throw new Error("Category not found or not updated");
            }
    
            return updatedCategory; 
        } catch (error) {
            throw error; 
        }
    }
    
    static async deleteCourseCategory(id){
        return await courseCategory.destroy({where:{id:id}});
    }
}