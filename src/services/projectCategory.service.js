import projectCategory from "../database/models/projectCategory.model";

export class ProjectCategoryService { 
    static async getProjectCategories() { 
        return await projectCategory.findAll();
    }

    static async getProjectCategoryById(id) { 
        return await projectCategory.findOne({ where: { id: id } });
    }

    static async createProjectCategory(newProjectCategory) {
        return await projectCategory.create(newProjectCategory);
    }

    static async updateProjectCategory(id, updatedProjectCategory) {
        // eslint-disable-next-line no-useless-catch
        try {
            const [rowsUpdated, [updatedCategory]] = await projectCategory.update(updatedProjectCategory, {
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

    static async deleteProjectCategory(id) { // Updated method name
        return await projectCategory.destroy({ where: { id: id } });
    }
}
