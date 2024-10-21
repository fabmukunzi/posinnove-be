import Project from '../database/models/project.model';
import User from '../database/models/user.model';
import ProjectCategory from '../database/models/projectCategory.model';
import Task from '../database/models/task.model';
import Enrollment from '../database/models/enrollement.model';

export class ProjectService {
  static async getProjectById(id) {
    return await Project.findOne({
      where: { id },
      include: [
        {
          model: User,
          as: 'projectAuthor',
          attributes: ['firstName', 'lastName', 'email']
        },
        {
          model: ProjectCategory,
          as: 'category',
          attributes: ['id', 'projectCategory']
        }
      ]
    });
  }

  static async createProject(newProject) {
    return await Project.create(newProject);
  }

  static async updateProject(id, updatedProject) {
    return await Project.update(updatedProject, { where: { id } });
  }

  static async deleteProject(id) {
    return await Project.destroy({ where: { id } });
  }

  static async getProjects() {
    return await Project.findAll({
      include: [
        {
          model: User,
          as: 'projectAuthor',
          attributes: ['firstName', 'lastName', 'email']
        },
        {
          model: ProjectCategory,
          as: 'category',
          attributes: ['id', 'projectCategory']
        }
      ]
    });
  }

  static async getProjectsByCategory(projectCategoryId) {
    return await Project.findAll({
      where: { projectCategoryId },
      include: [
        {
          model: User,
          as: 'projectAuthor',
          attributes: ['firstName', 'lastName', 'email']
        },
        {
          model: ProjectCategory,
          as: 'category',
          attributes: ['id', 'projectCategory']
        }
      ]
    });
  }

  static async getProjectWithTasks(projectId) {
    return await Project.findOne({
      where: { id: projectId },
      include: [
        {
          model: User,
          as: 'projectAuthor',
          attributes: ['firstName', 'lastName', 'email']
        },
        {
          model: ProjectCategory,
          as: 'category',
          attributes: ['id', 'projectCategory']
        },
        {
          model: Task,
          as: 'tasks',
          attributes: ['id', 'title', 'taskContent', 'coverImage']
        }
      ]
    });
  }

  static async getProjectWithTasksAndEnrollments(projectId) {
    return await Project.findOne({
        where: { id: projectId },
        include: [
            {
                model: Task,
                as: 'tasks',
                attributes: ['id', 'title', 'taskContent', 'coverImage']
            },
            {
                model: Enrollment,
                as: 'enrollments',
                include: [
                    {
                        model: User,
                        as: 'enrolledUser',
                        attributes: ['id', 'firstName', 'lastName', 'email']
                    }
                ]
            }
        ]
    });
}
}