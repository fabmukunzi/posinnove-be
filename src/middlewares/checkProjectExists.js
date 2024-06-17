import { ProjectService } from '../services/project.services';

export const checkProjectExists = async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await ProjectService.getProjectById(id);
    if (!project) {
      return res.status(404).json({ error: 'Project  does not exist' });
    }
    req.project = project;
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
