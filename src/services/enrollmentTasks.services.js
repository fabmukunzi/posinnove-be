import Enrollment from "../database/models/enrollement.model";
import enrollmentTask from "../database/models/enrollmentTask.model";
import Task from "../database/models/task.model";

export class EnrollmentTasksService {
    static async createEnrollmentTask (obj) {
        return await enrollmentTask.create(obj);
    }

    static async getTaskById (taskId) {
        return await Task.findOne({ where: { id: taskId }});
    }

    static async getSingleEnrollmentTask (id) {
        return await enrollmentTask.findOne({ where: { id } })
    }

    static async getAllEnrollments () {
        return await enrollmentTask.findAll()
    }
    
    static async getEnrollmentTaskByFieldsId(taskId = null, enrollmentId = null) {
        let query = {};
      
        if (taskId) {
          query.taskId = taskId;
        } else if (enrollmentId) {
          query.enrollmentId = enrollmentId;
        } else {
            return null
        }
      
        const enrollmentTask = await enrollmentTask.findOne({ where: query });
        return enrollmentTask || null;
    }  
    
    static async updateEnrollmentTask (id, updatedData) {
        return await enrollmentTask.update(updatedData, { where: { id } });
    }

    static async deleteEnrollmentTask (id) {
        await enrollmentTask.destroy({ where: { id }});
    }
}