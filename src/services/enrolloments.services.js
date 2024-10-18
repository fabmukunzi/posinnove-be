import Enrollment from "../database/models/enrollement.model";
import Project from "../database/models/project.model";
import User from "../database/models/user.model";

export class EnrollmentService {
  static async getAllEnrollments () {
    return await Enrollment.findAll({
      include : [
        {
          model: User,
          as: 'enrolledUser',
          attributes: ['firstName', 'lastName']
        },
        {
          model: Project,
          as: 'project',
          attributes: ['id', 'title']
        }
      ]
    })
  }

  static async createNewEnrollments (newEnrollment) {
    return await Enrollment.create(newEnrollment);
  }

  static async getSingleEnrollment (id) {
    return await Enrollment.findOne({ 
      where : { id },
      include: [
        {
          model: User,
          as: 'enrolledUser',
          attributes: ['firstName', 'lastName']
        },
        {
          model: Project,
          as: 'project',
          attributes: ['id', 'title']
        }
      ]
    });
  }

  static async updateEnrollment(id, updatedEnrollment) {
    return await Enrollment.update(updatedEnrollment, { where: { id }});
  }

  static async deleteEnrollment(id) {
    return await Enrollment.destroy({ where: { id }});
  }
}