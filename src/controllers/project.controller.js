import { ProjectService } from '../services/project.services';
import { retryUpload } from '../helpers/retryUpload'; // Import the retry upload function
import { uploadMiddleware } from '../middlewares/uploadMiddleware'; // Import the upload middleware

export const createProject = async (req, res) => {
  uploadMiddleware(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to handle file upload' });
    }

    try {
      const { title, projectCategoryId, projectContent, maxAttendances, level, deadline, startDate } = req.body;
      const loggedUser = req.user;
      const author = loggedUser.id;


      if (!req.files || !req.files['coverImage'] || !req.files['uploads']) {
        return res.status(400).json({ error: 'Cover image and PDF uploads are required' });
      }

      const coverImageFile = req.files['coverImage'][0];
      const coverImageUrl = await retryUpload(coverImageFile.path, 'coverImages');

      const uploadsUrls = await Promise.all(
        req.files['uploads'].map(async (file) => {
          const uploadUrl = await retryUpload(file.path, 'uploads');
          return uploadUrl;
        })
      );

      const newProject = {
        title,
        projectCategoryId,
        coverImage: coverImageUrl,
        projectContent,
        maxAttendances,
        level,
        deadline,
        startDate,
        author,
        uploads: uploadsUrls,
      };

      const project = await ProjectService.createProject(newProject);

      return res.status(201).json(project);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ 
        message: 'Failed to create project',
        error: error.message
       });
    }
  });
};

export const getAllProjects = async (req, res) => {
  try {
    const allProjects = await ProjectService.getProjects();
    return res.status(200).json({
      status: 'success',
      message: 'Projects retrieved successfully',
      data: { projects: allProjects },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: error.message,
    });
  }
};

export const getOneProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await ProjectService.getProjectById(id);
    return res.status(200).json({
      status: 'success',
      message: 'Project retrieved successfully',
      data: { project },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: error.message,
    });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProject = await ProjectService.deleteProject(id);
    return res.status(200).json({
      status: 'success',
      message: 'Project deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: error.message,
    });
  }
};
