import Project from '../database/models/project.model';
import User from '../database/models/user.model';
import ProjectCategory from '../database/models/projectCategory.model';

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
}