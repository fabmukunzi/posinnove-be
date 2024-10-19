import Project from "../database/models/project.model";
import Task from "../database/models/task.model";

export class TaskService {
    static async createTask (taskObj) {
        return await Task.create(taskObj);
    }

    static async getAllTasks () {
        return await Task.findAll({
            include: [{
                model: Project,
                as: 'project',
                attributes: ['title', 'projectContent', 'deadline']
            }]
        })
    }

    static async getTaskByID (id) {
        return await Task.findOne({
            where: { id },
            include: [{
                model: Project,
                as: 'project',
                attributes: ['title', 'projectContent', 'deadline']
            }]
        })
    }

    static async updateTask (id, updatedTask) {
        return await Task.update({ updatedTask, where: { id }});
    }

    static async deleteTask (id) {
        return await Task.destroy({ where: { id }});
    }
}