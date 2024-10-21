import { ProjectService } from '../services/project.services';
import { retryUpload } from '../helpers/retryUpload';
import { uploadMiddleware } from '../middlewares/uploadMiddleware';
import {updateProjectSchema} from '../validations/project.update';
import { handleInternalServerError } from '../utils/errorHandlers';

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

      return res.status(201).json({
        status: 'success',
        message: 'Project created successfully',
        data: { project },
      });
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
    return handleInternalServerError(res, error);
  }
};

export const getOneProject = async (req, res) => {
  const project = req.project;

  try {
    const projectData = project;
    return res.status(200).json({
      status: 'success',
      message: 'Project retrieved successfully',
      data: projectData,
    });
  } catch (error) {
    return handleInternalServerError(res, error);
  }
};

export const getProjectsByCategory = async (req, res) => {
  const { projectCategoryId } = req.params;

  try {
    const projects = await ProjectService.getProjectsByCategory(projectCategoryId);
    if (!projects || projects.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No projects found for the specified category',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Projects retrieved successfully',
      data: { projects },
    });
  } catch (error) {
    return handleInternalServerError(res, error);
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
    return handleInternalServerError(res, error);
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;

  const { error, value: updates } = updateProjectSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      status: 'fail',
      message: error.details.map((detail) => detail.message),
    });
  }

  uploadMiddleware(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to handle file upload' });
    }

    try {
      const loggedUser = req.user;
      const author = loggedUser.id;

      const existingProject = await ProjectService.getProjectById(id);
      if (!existingProject) {
        return res.status(404).json({ error: 'Project not found' });
      }

      let coverImageUrl = existingProject.coverImage;
      let uploadsUrls = existingProject.uploads;

      if (req.files && req.files['coverImage']) {
        const coverImageFile = req.files['coverImage'][0];
        coverImageUrl = await retryUpload(coverImageFile.path, 'coverImages');
      }

      if (req.files && req.files['uploads']) {
        uploadsUrls = await Promise.all(
          req.files['uploads'].map(async (file) => {
            const uploadUrl = await retryUpload(file.path, 'uploads');
            return uploadUrl;
          })
        );
      }

      const updatedProject = {
        title: updates.title || existingProject.title,
        projectCategoryId: updates.projectCategoryId || existingProject.projectCategoryId,
        projectContent: updates.projectContent || existingProject.projectContent,
        maxAttendances: updates.maxAttendances || existingProject.maxAttendances,
        level: updates.level || existingProject.level,
        deadline: updates.deadline || existingProject.deadline,
        startDate: updates.startDate || existingProject.startDate,
        coverImage: coverImageUrl,
        uploads: uploadsUrls,
        author,
      };

      // Update the project in the database
      await ProjectService.updateProject(id, updatedProject);

      return res.status(200).json({
        status: 'success',
        message: 'Project updated successfully',
        project: updatedProject,
      });
    } catch (error) {
      console.log(error);
      return handleInternalServerError(res, error);
    }
  });
};
