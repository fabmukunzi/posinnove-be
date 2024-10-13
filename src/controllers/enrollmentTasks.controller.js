import { retryUpload } from "../helpers/retryUpload";
import { handleBadRequest, handleInternalServerError, handleNotFound } from "../utils/errorHandlers";
import { EnrollmentTasksService } from "../services/enrollmentTasks.services";
import { EnrollmentService } from "../services/enrolloments.services";

export const createEnrollmentTask = async (req, res) => {
  const { enrollmentId, taskId } = req.body;

  if (handleBadRequest(res, {EnrollmentId: enrollmentId, TaskId: taskId})) return;

  const [enrollment, task] = await Promise.all([
    EnrollmentService.getSingleEnrollment(enrollmentId),
    EnrollmentTasksService.getTaskById(taskId)
  ]);

  if (handleNotFound(res, {Enrollment: enrollment, Task: task})) return;

  const enrollmentObj = {
    enrollmentId,
    taskId
  }

  try {
    const enrollmentTaskRes = await EnrollmentTasksService.createEnrollmentTask(enrollmentObj);

    return res.status(201).json({
      status: 'success',
      message: 'Task Added to Enrolment successfully',
      data: enrollmentTaskRes
    })
  } catch (error) {
    return handleInternalServerError(res, error);
  }
}

export const getAllEnrollmentTasks = async (req, res) => {
  try {
    const allEnrollmentTasks = await EnrollmentTasksService.getAllEnrollments();

    return res.status(200).json({
      status: 'success',
      message: 'All enrollments fetched successfully',
      data: allEnrollmentTasks
    })
  } catch (error) {
    return handleInternalServerError(res, error);
  }
}

export const getTasksByEnrollment = async (req, res) => {
  const enrollmentId = req.params.id;

  if (handleBadRequest(res, { enrollmentId })) return;

  try {
    const enrollmentTask = await EnrollmentTasksService.getSingleEnrollmentTask(enrollmentId);

    if (handleNotFound(res, { enrollmentTask })) return;

    return res.status(200).json({
      status: 'success',
      data: enrollmentTask,
    });

  } catch (error) {
    return handleInternalServerError(res, error);
  }
};

export const deleteEnrollmentTask = async (req, res) => {
  const { id } = req.params;

  if (handleBadRequest(res, { id })) return;

  try {
    const deletedEnrollmentTask = await EnrollmentTasksService.deleteEnrollmentTask(id);

    if (handleNotFound(res, { EnrollmentTask : deletedEnrollmentTask })) return;

    return res.status(204).json({
      status: 'success',
      message: 'The Enrollment Task has been deleted successfully',
    })
  } catch (error) {
    return handleInternalServerError(res, error);
  }
}

export const startTask = async (req, res) => {
  const enrollmentTaskId = req.params.id;

  if (handleBadRequest(res, { enrollmentTaskId })) return;

  try {
    const enrollmentTask = await EnrollmentTasksService.getSingleEnrollmentTask(enrollmentTaskId);

    if (handleNotFound(res, { enrollmentTask })) return;   

    const updatedEnrollmentTaskData = {
      status: 'in_progress',
      startedAt: new Date()
    };

    const updatedEnrollmentTask = await EnrollmentTasksService.updateEnrollmentTask(enrollmentTaskId, updatedEnrollmentTaskData);

    return res.status(200).json({
      status: 'success',
      message: "Task Started successfully",
      data: updatedEnrollmentTask
    })
    } catch (error) {
    return handleInternalServerError(res, error);
  }
}

export const submitTask = async (req, res) => {
  const enrollmentTaskId = req.params.id;

  if (handleBadRequest(res, { enrollmentTaskId })) return;

  try {
    const enrollmentTask = await EnrollmentTasksService.getSingleEnrollmentTask(enrollmentTaskId);

    if (handleNotFound(res, { enrollmentTask })) return;

    let submissionContent = null;

    if (req.file) {
      const filePath = req.file.path;
      const folder = 'submissions';

      try {
        const uploadUrl = await retryUpload(filePath, folder);
        submissionContent = uploadUrl;
      } catch (uploadError) {
        return handleInternalServerError(res, { error: uploadError });
      }
    } else if (req.body.submissionContent) {
      submissionContent = req.body.submissionContent;
    }

    const updatedEnrollmentTaskData = {
      submissionContent: submissionContent,
      status: 'review_pending',
    };

    const updatedEnrollmentTask = await EnrollmentTasksService.updateEnrollmentTask(enrollmentTaskId, updatedEnrollmentTaskData);
    
    return res.status(200).json(updatedEnrollmentTask);
  } catch (error) {
    return handleInternalServerError(res, error);
  }
};

export const reviewTask = async (req, res) => {
  const enrollmentTaskId = req.params.id;

  if (handleBadRequest(res, { enrollmentTaskId })) return;

  try {

    const enrollmentTask = await EnrollmentTasksService.getSingleEnrollmentTask(enrollmentTaskId);

    if (handleNotFound(res, { enrollmentTask })) return;

    const updatedEnrollmentTaskData = {
      status: 'completed',
      isCompleted: true,
      completedAt: new Date(),
    };

    const updatedEnrollmentTask = await EnrollmentTasksService.updateEnrollmentTask(enrollmentTaskId, updatedEnrollmentTaskData);

    return res.status(200).json({
      status: 'succes',
      message: 'Task Reviewed successfully',
      data: updatedEnrollmentTask
    });

  } catch (error) {
    return handleInternalServerError(res, error);
  }
};

