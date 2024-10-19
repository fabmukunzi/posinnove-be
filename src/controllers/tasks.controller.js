import { retryUpload } from "../helpers/retryUpload";
import { uploadMiddleware } from "../middlewares/uploadMiddleware";
import { TaskService } from "../services/tasks.services";
import { handleBadRequest, handleInternalServerError, handleNotFound } from "../utils/errorHandlers"
import fs from 'fs'

export const getAllTasks = async (req, res) => {
    try {
        const allTasks = await TaskService.getAllTasks();

        return res.status(200).json({
            status: 'success',
            message: 'Tasks fetched successfully',
            data: allTasks
        })
    } catch (error) {
        return handleInternalServerError(res, error);
    }
}

export const getSingleTask = async (req, res) => {
    const { id } = req.params;

    if (handleBadRequest(res, { id })) return;

    try {
        const task = await TaskService.getTaskByID(id);

        if (handleNotFound(res, { Task: task })) return;

        return res.status(200).json({
            status: 'error',
            message: 'Task fetched successfully',
            data: task
        })
    } catch (error) {
        return handleInternalServerError(res, error);
    }
}

export const createTask = async (req, res) => {
    uploadMiddleware(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to handle file upload' });
        }
    
        try {
          const { title, projectId, taskContent } = req.body;
          console.log('Request Body: ', req.body);
    
    
          if (handleBadRequest(res, { 'Cover Image file': req.files, 'Cover Image': req.files['coverImage'] })) return;
    
          const coverImageFile = req.files['coverImage'][0];
          const coverImageUrl = await retryUpload(coverImageFile.path, 'taskCoverImages');
    
    
          const newTask = {
            title,
            projectId,
            coverImage: coverImageUrl,
            taskContent,
          };
    
          const task = await TaskService.createTask(newTask);
    
          return res.status(201).json({
            status: 'success',
            message: 'Task created successfully',
            data: task,
          });
        } catch (error) {
          return handleInternalServerError(res, error);
        }
      });
}