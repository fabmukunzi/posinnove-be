import Project from '../database/models/project.model';

export class ProjectService {
  static async getProjectById(id) {
    return await Project.findOne({ where: { id } });
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
    return await Project.findAll();
  }
}
